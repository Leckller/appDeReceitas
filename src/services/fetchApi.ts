import { Form, Path } from '../types';

// opção de utilizar o search no lugar de filter para pegar os valores dinâmicos do final do endPoint.
const recipePath = {
  Meal: 'meal',
  Drink: 'cocktail',
};

// monta de forma dinâmica o endPoint
const getEndPoint = (form: Form, path: Path, filter: string) => {
  const { search = '', key } = form;
  // cada chave do objeto endPoint trás o final do endPoint de forma dinâmica.
  const endPoint = {
    ingredient: `filter.php?i=${search}`,
    name: `search.php?s=${search}`,
    firstLetter: `search.php?f=${search}`,
    list: 'list.php?c=list',
    categories: `filter.php?c=${filter}`,
  };

  // eu acesso de forma dinâmica o 'recipePath' utilizando meu '"path" que pode ser "Meal" ou "Drink"' assim eu acesso a chave do objeto 'recipePath' e pego o valor do objeto que pode ser 'meal' ou 'cocktail'.

  // e também eu acesso de forma dinâmica o 'endPoint' utilizando meu 'key' que pode ser "ingredient" ou "name" ou "firstLetter" e assim sucessivamente, quantas chaves quisermos acessar e assim podemos pegar o valor do objeto que pode ser `filter.php?i=${search}` ou `search.php?s=${search}`, e assim sucessivamente novamente.

  return `https://www.the${recipePath[path as keyof typeof recipePath]}db.com/api/json/v1/1/${endPoint[key as keyof typeof endPoint]}`;
};

// faz o fecth da API
export const fecthApi = async (
  form: Form,
  path: Path,
  filter: string,
) => {
  try {
    const endPoint = getEndPoint(form, path, filter);
    const pathLower = `${path.toLowerCase()}s`;

    const response = await fetch(endPoint);
    const data = await response.json();

    if (!data[pathLower]) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }

    return data[pathLower];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
