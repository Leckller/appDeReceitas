import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch, Form } from '../../types';
import { getRecipes } from '../../redux/actions';
import { fecthApi } from '../../services/fetchApi';

function SearchBar() {
  // pathname pega a rota em que você estiver
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

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

  // pega o pathname e faz um condicional de forma dinâmica se for Drinks ou Meals.
  const path = pathname.includes('/meals') ? 'Meal' : 'Drink';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // verifica se o input search tiver tamanho maior que 1 e dispara o alerta.
    if (key === 'firstLetter' && search && search.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }

    // faz o fecth e o filtro na API de forma dinâmica e Dispara para o State Global Recipes.
    const recipes = await fecthApi(form, path, key);
    dispatch(getRecipes(recipes));

    // faz a verificação se o filtro da API for igual a 1, redireciona para a página de detalhes do produto.
    if (recipes.length === 1) {
      navigate(`${pathname}/${recipes[0][`id${path}`]}`);
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
