import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form } from '../../types';
import { getResponse } from '../../redux/actions';
import { fecthApi } from '../../services/fetchApi';

function SearchBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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


  const key = pathname.includes('/meals') ? 'Meal' : 'Drink';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fecthApi(form, key);

      dispatch(getResponse(response));

      if (response.length === 1) {
        navigate(`${pathname}/${response[0][`id${key}`]}`);
      }
    } catch (error: any) {
      window.alert(error.message);
    }
  };

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
