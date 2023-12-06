import { Form, Path } from '../types';

const recipePath = {
  Meal: 'meal',
  Drink: 'cocktail',
};

// monta de forma dinâmica o endPoint
const createEndPoint = (form: Form, path: Path, filter: string) => {
  const { search = '', key } = form;
  // cada chave do objeto endPoint trás o final do endPoint de forma dinâmica.
  const endPoint = {
    ingredient: `filter.php?i=${search}`,
    name: `search.php?s=${search}`,
    firstLetter: `search.php?f=${search}`,
    list: 'list.php?c=list',
    categories: `filter.php?c=${filter}`,
    id: `lookup.php?i=${filter}`,
  };

  return `https://www.the${recipePath[path]}db.com/api/json/v1/1/${endPoint[key]}`;
};

// faz o fecth da API
export const fecthApi = async (
  form: Form,
  path: Path,
  filter: string,
) => {
  try {
    const endPoint = createEndPoint(form, path, filter);

    // console.log(endPoint);

    const pathLowerCase = `${path.toLowerCase()}s`;

    const response = await fetch(endPoint);

    const data = await response.json();

    return data[pathLowerCase] || [];
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};
