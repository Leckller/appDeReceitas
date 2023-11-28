import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form, GlobalState, Path } from '../../types';
import { addList } from '../../redux/actions';

function SearchBar() {
  const { recipes: { recipes } } = useSelector((state: GlobalState) => state);
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
    <div>
      <h1>{ pathFilter }</h1>
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
          name="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleChange }
          checked={ radio === 'ingredient' }
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio"
          name="radio"
          id="name"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
          checked={ radio === 'name' }
        />
        <label htmlFor="first-letter">First Letter</label>
        <input
          type="radio"
          name="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleChange }
          checked={ radio === 'firstLetter' }
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
