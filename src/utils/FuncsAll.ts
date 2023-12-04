import { fecthApi } from '../services/fetchApi';
import { Form, Path } from '../types';

// faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
export const filterAll = async (form: Form, path: Path, filter: string = '') => {
  const { search = '', key } = form;
  const data = await fecthApi({ key, search }, path, filter);
  return data;
};

// verifica a rota que está e faz a condicional de forma dinâmica Drinks ou Meals.
export const route = (path: string) => (path.includes('/meals') ? 'Meal' : 'Drink');

export const routeInverse = (path: string) => (path
  .includes('/drinks') ? 'Meal' : 'Drink');

export const path = (routes: string) => (routes.includes('/meals') ? 'meals' : 'drinks');

export const pathInverse = (routes: string) => (routes
  .includes('/drinks') ? 'meals' : 'drinks');
