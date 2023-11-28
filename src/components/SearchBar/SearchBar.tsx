import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form, GlobalState, Path } from '../../types';
import { addList } from '../../redux/actions';

function SearchBar() {
  const { recipesReducer: { recipes } } = useSelector((state: GlobalState) => state);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();

  const INITIAL_STATE: Form = {
    search: '',
    radio: 'ingredient',
  };
  const [form, setForm] = useState<Form>(INITIAL_STATE);
  const { search, radio } = form;

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const renderTitle = (str: string) => str.charAt(1) + str.slice(2);

  const pathFilter = renderTitle(pathname) as Path;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addList(form, pathFilter));

    if (recipes.length === 1) {
      navigate(`${pathname}/${recipes[0].idMeal}`);
    }
  };

  return (
    <div className="flex items-center flex-col bg-white">
      <h1>{ pathFilter }</h1>
      <form
        onSubmit={ handleSubmit }
        className="flex flex-col items-start p-3"
      >
        <label htmlFor="search">
          Search
          <input
            className="border border-black"
            type="text"
            name="search"
            id="search"
            data-testid="search-input"
            value={ search }
            onChange={ handleChange }
          />

        </label>

        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            name="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
            checked={ radio === 'ingredient' }
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="radio"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
            checked={ radio === 'name' }
          />

        </label>

        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            name="radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ handleChange }
            checked={ radio === 'firstLetter' }
          />
        </label>

        <button
          data-testid="exec-search-btn"
          className="border p-1 border-black"
        >
          Enter
        </button>

      </form>
    </div>
  );
}

export default SearchBar;
