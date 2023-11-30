import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Drinks, Form, Meals, TypeRecipes } from '../types';
import { fecthApi } from '../services/fetchApi';
// import { setAnyFilterInGlobal, setLoading } from '../redux/actions';

function Details() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  const [product, setProduct] = useState<Meals | Drinks>({});
  const [recomended, setRecomended] = useState<TypeRecipes>([]);

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
      const recipes = await filterAll({ key: 'name' });
      setRecomended(recipes);
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
                src={ product[`str${recipePath}Thumb`] as string }
                alt={ product[`str${recipePath}`] as string }
              />
              <h1
                data-testid="recipe-title"
              >
                { product[`str${recipePath}`] }
              </h1>
              <p data-testid="recipe-category">{ product.strCategory }</p>
              <p data-testid="instructions">{ product.strInstructions }</p>
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
                src={ video as string }
                allowFullScreen
                title={ product[`str${recipePath}`] as string }
                data-testid="video"
              />
              {
                recomended.slice(0, 6).map((recipe, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <img
                      src={ recipe[`str${recipePath}Thumb`] as string }
                      alt={ recipe[`str${recipePath}`] as string }
                    />
                    <h3
                      data-testid={ `${index}-recommendation-title` }
                    >
                      {recipe[`str${recipePath}`]}
                    </h3>
                  </div>
                ))
              }
              <button data-testid="start-recipe-btn">Start Recipe</button>
            </form>
          </div>
        )
      }
    </div>
  );
}

export default Details;
