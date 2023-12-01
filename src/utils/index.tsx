import { useLocalStorage } from '../hooks/useLocalStorage';
import { fecthApi } from '../services/fetchApi';
import { Favorite, Form, Path, TypeRecipes } from '../types';

export const getIngredient = (product: TypeRecipes) => {
  return Object.entries(product).reduce((
    acc,
    [key, value]: any,
  ) => {
    if (key.includes('strIngredient') && value) {
      const num = key.split('strIngredient')[1];
      return { ...acc, [num]: [value, acc[num]] };
    }
    if (key.includes('strMeasure') && value) {
      const num = key.split('strMeasure')[1];
      return { ...acc, [num]: [acc[num][0], value] };
    }
    return acc;
  }, {} as { [key: string]: [string, string | undefined] });
};

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
