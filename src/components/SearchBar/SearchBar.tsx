import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form, GlobalState } from '../../types';
import { getAllFilters } from '../../redux/actions';
import { fecthApi } from '../../services/fetchApi';
import Loading from '../Loading/Loading';
import { route } from '../../utils/FuncsAll';
import { DivSearchBar } from '../../styles';

function SearchBar() {
  // pathname pega a rota em que você estiver
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const loading = useSelector((state: GlobalState) => state.loading);

  const INITIAL_STATE: Form = {
    search: '',
    key: 'ingredient',
  };
  const [form, setForm] = useState<Form>(INITIAL_STATE);
  const { search, key } = form;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipes = await fecthApi(form, route(pathname), key);
    dispatch(getAllFilters(recipes));
    if (key === 'firstLetter' && search && search.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } else if (!recipes.length) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }

    if (recipes.length === 1) {
      navigate(`${pathname}/${recipes[0][`id${route(pathname)}`]}`);
    }
  };

  if (loading) {
    return (<Loading />);
  }

  return (
    <DivSearchBar
      className="bg-white z-50 h-68 p-5
      border-2 border-purple-700 w-80 "
    >
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col items-center p-5 gap-2"
      >
        <div className="flex flex-col gap-2 items-center">
          <label className="flex flex-col items-center" htmlFor="search">
            <h2>
              Search
            </h2>

            <input
              className="outline-none w-4/6"
              placeholder="Ex: tomato"
              type="text"
              name="search"
              id="search"
              data-testid="search-input"
              value={ search }
              onChange={ handleChange }
            />
          </label>
          <label className="flex flex-row items-center" htmlFor="ingredient">
            <h2 className="w-36">
              Ingredient
            </h2>

            <input
              type="radio"
              name="key"
              id="ingredient"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ handleChange }
              checked={ key === 'ingredient' }
            />
          </label>
          <label className="flex flex-row items-center" htmlFor="name">
            <h2 className="w-36">
              Name
            </h2>

            <input
              type="radio"
              name="key"
              id="name"
              data-testid="name-search-radio"
              value="name"
              onChange={ handleChange }
              checked={ key === 'name' }
            />
          </label>
          <label className="flex flex-row items-center" htmlFor="first-letter">
            <h2 className="w-36">
              First Letter
            </h2>

            <input
              type="radio"
              name="key"
              id="first-letter"
              data-testid="first-letter-search-radio"
              value="firstLetter"
              onChange={ handleChange }
              checked={ key === 'firstLetter' }
            />
          </label>

        </div>
        <button
          data-testid="exec-search-btn"
          className="bg-purple-700 pl-5 pr-5 p-1 text-white
            hove
          "
        >
          Enter
        </button>

      </form>
    </DivSearchBar>
  );
}

export default SearchBar;
