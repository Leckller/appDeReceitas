import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form, GlobalState } from '../../types';
import { getAllFilters } from '../../redux/actions';
import { fecthApi } from '../../services/fetchApi';
import Loading from '../Loading/Loading';
import { route } from '../../utils/FuncsAll';

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
    if (key === 'firstLetter' && search && search.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }

    const recipes = await fecthApi(form, route(pathname), key);
    dispatch(getAllFilters(recipes));

    if (!recipes.length) {
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
    <div>
      <form
        onSubmit={ handleSubmit }
      >
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          value={ search }
          onChange={ handleChange }
        />
        <label htmlFor="ingredient">Ingredient</label>
        <input
          type="radio"
          name="key"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleChange }
          checked={ key === 'ingredient' }
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio"
          name="key"
          id="name"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
          checked={ key === 'name' }
        />
        <label htmlFor="first-letter">First Letter</label>
        <input
          type="radio"
          name="key"
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleChange }
          checked={ key === 'firstLetter' }
        />
        <button
          data-testid="exec-search-btn"
        >
          Enter
        </button>

      </form>
    </div>
  );
}

export default SearchBar;
