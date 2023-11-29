import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form } from '../types';
import { fecthApi } from '../services/fetchApi';
// import { setAnyFilterInGlobal, setLoading } from '../redux/actions';

type Product = {
  [key: string]: string,
};

function Details() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';
  const [product, setProduct] = useState<Product>({});

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
    .filter((teste) => teste[0].includes('strIngredient'));

  const video = pathname === '/drinks' ? product.strVideo
    : product.strYoutube?.replace('watch?v=', 'embed/');

  return (
    <div>
      <h1>{keyPage}</h1>
      {
        product && (
          <div>
            <form>
              <img
                data-testid="recipe-photo"
                src={ product[`str${recipePath}Thumb`] }
                alt={ product[`str${recipePath}`] }
              />
              <h1
                data-testid="recipe-title"
              >
                { product[`str${recipePath}`] }
              </h1>
              <p data-testid="recipe-category">{product.strCategory}</p>
              {
                ingredient.map((value, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ index }
                  >
                    { value[1] }
                  </p>
                ))
              }
              <iframe
                src={ video }
                allowFullScreen
                title={ product[`str${recipePath}`] }
                data-testid="video"
              />
            </form>
          </div>
        )
      }
    </div>
  );
}

export default Details;
