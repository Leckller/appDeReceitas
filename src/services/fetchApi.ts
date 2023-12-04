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

  return `https://www.the${recipePath[path as keyof typeof recipePath]}db.com/api/json/v1/1/${endPoint[key as keyof typeof endPoint]}`;
};

// faz o fecth da API
export const fecthApi = async (
  form: Form,
  path: Path,
  filter: string,
) => {
  try {
    const endPoint = createEndPoint(form, path, filter);
    console.log(endPoint);

    const pathLowerCase = `${path.toLowerCase()}s`;

    const response = await fetch(endPoint);

    const data = await response.json();

    return data[pathLowerCase] || [];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Como é criado o endPoint de forma Dinâmica.
/*
  Condição dinâmina do parêmetro "path":
  - Acesso de forma dinâmica o 'recipePath' utilizando meu '"path" que pode ser "Meal" ou "Drink"'.
  - Assim eu acesso a chave do objeto 'recipePath' e pego o valor do objeto que pode ser 'meal' ou 'cocktail'.
  - Exemplo de um endPoint: https://www.themealdb.com/api/json/v1/1/list.php?c=list
    - No final do endPoint ele espera essa chave "Beef".
    - Então passamos a chave "path" de forma dinâmica.
      - Exemplo: https://www.the${recipePath[path]}db.com/api/json/v1/1/list.php?c=list
        - No caso path = Meal e dentro da objeto endPoint a chave list tem o valor = 'meal'
          - seria a mesma coisa que https://www.themealdb.com/api/json/v1/1/list.php?c=list
*/

/*
  Condição dinâmina do parêmetro "form":
  - Na linha 11 eu desestruturo o "search" e o "key" de dentro do "form"
  - Assim eu  acesso de forma dinâmica o objeto 'endPoint' utilizando meu paramêtro 'key' que pode ser "ingredient" ou "name" ou "firstLetter" e assim sucessivamente.
  - Depois que acessamos a chave do objeto "endPoint", podemos pegar o valor do objeto que pode ser `filter.php?i=${search}` ou `search.php?s=${search}`, e assim sucessivamente novamente.
  - Exemplo de um endPoint: https://www.themealdb.com/api/json/v1/1/list.php?c=list
    - No final do endPoint ele espera essa chave "Beef".
    - Então passamos a chave "filter" de forma dinâmica.
      - Exemplo: https://www.themealdb.com/api/json/v1/1/${endPoint[key]}
        - No caso key = list e dentro da objeto endPoint a chave list tem o valor = 'list.php?c=list'
            - seria a mesma coisa que https://www.themealdb.com/api/json/v1/1/list.php?c=list
*/

/*
  Condição dinâmina do parêmetro "filter":
  - O paramêtro "filter" será para quando o endPoint precisa receber uma chave dinâmica no final do endPoint.
  - Exemplo de um endPoint: https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef
    - No final do endPoint ele espera essa chave "Beef".
    - Então passamos a chave "filter" de forma dinâmica.
      - Exemplo: https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}
        - No caso filter = Beef
          - seria a mesma coisa que https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef
*/
