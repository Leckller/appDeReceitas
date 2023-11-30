import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Drinks, Form, Meals } from '../types';
import { fecthApi } from '../services/fetchApi';
// import { setAnyFilterInGlobal, setLoading } from '../redux/actions';

function Details() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  const [product, setProduct] = useState<Meals | Drinks>({});

  // verifica a rota que está e faz a condicional de forma dinâmica Drinks ou Meals.
  const recipePath = pathname.includes('/meals') ? 'Meal' : 'Drink';

  // faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
  const filterAll = async (form: Form, filter: string = '') => {
    const { search = '', key } = form;
    const data = await fecthApi({ key, search }, recipePath, filter);
    return data;
  };

  useEffect(() => {
    (async () => {
      const data = await filterAll({ key: 'id' }, id);
      setProduct(data[0]);
    })();
  }, [recipePath, id]);

  const ingredient = Object.entries(product)
    .filter((teste) => teste[0].includes('strIngredient')
    || teste[0].includes('strMeasure'))
    .filter((i) => i[1] !== null).sort((a, b) => {
      if (a[0][a[0].length - 1] > b[0][b[0].length - 1]) return 1;
      if (a[0][a[0].length - 1] < b[0][b[0].length - 1]) return -1;
    })
    .reduce((a, b) => {
      return [...a, { [b[0]]: b[1] }];
    }, []);

  const video = pathname === '/drinks' ? product.strVideo
    : product.strYoutube?.replace('watch?v=', 'embed/');

  console.log(ingredient);
  return (
    <main className="flex flex-col justify-center items-center">
      <h1>{keyPage}</h1>
      {
        product && (
          <section>
            <article>
              <img
                data-testid="recipe-photo"
                src={ product[`str${recipePath}Thumb`] as string }
                alt={ product[`str${recipePath}`] as string }
              />
              <h1
                data-testid="recipe-title"
              >
                { product[`str${recipePath}`] }
              </h1>
              <p data-testid="recipe-category">{ product.strCategory }</p>
              <p data-testid="instructions">{ product.strInstuctions }</p>
              {
                ingredient.map((value, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { value.strIngredient1 }
                  </p>
                ))
              }
              <iframe
                src={ video as string }
                allowFullScreen
                title={ product[`str${recipePath}`] as string }
                data-testid="video"
              />
            </article>
          </section>
        )
      }
    </main>
  );
}

export default Details;
