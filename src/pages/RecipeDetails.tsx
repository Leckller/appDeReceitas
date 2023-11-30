import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Form, GlobalState, TypeRecipes } from '../types';
import { fecthApi } from '../services/fetchApi';
import { setAnyFilterInGlobal } from '../redux/actions';
import { useLocalStorage } from '../hooks/useLocalStorage';
// import { setAnyFilterInGlobal, setLoading } from '../redux/actions';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getItem } = useLocalStorage('doneRecipes');
  const dispatch: Dispatch = useDispatch();
  const filters = useSelector((state: GlobalState) => state.filters);
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  const [recomended, setRecomended] = useState<TypeRecipes[]>([]);

  // verifica a rota que está e faz a condicional de forma dinâmica Drinks ou Meals.
  const recipePath = pathname.includes('/meals') ? 'Meal' : 'Drink';

  const pathInverse = pathname.includes('/drinks') ? 'Meal' : 'Drink';

  // faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
  const filterAll = async (form: Form, filter: string = '') => {
    const { search = '', key } = form;
    const data = await fecthApi({ key, search }, pathInverse, filter);
    return data;
  };

  useEffect(() => {
    (async () => {
      const recipes = await filterAll({ key: 'name' });
      setRecomended(recipes);
    })();
    dispatch(setAnyFilterInGlobal({ key: 'id' }, recipePath, id));
  }, [recipePath, id]);

  const product = filters[0] || {};

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  // const ingredient = Object.entries(product).reduce((acc, [key, value]) => {
  //   if (key.includes('strIngredient') && value) {
  //     const num = key.split('strIngredient')[1];
  //     return { ...acc, [num]: [value, acc[num]] };
  //   }
  //   if (key.includes('strMeasure') && value) {
  //     const num = key.split('strMeasure')[1];
  //     return { ...acc, [num]: [acc[num][0], value] };
  //   }
  //   return acc;
  // }, {} as { [key: string]: [string, string | undefined] });
  // console.log(ingredient);

  const getLocalStorage: TypeRecipes[] = getItem()
    ?.some((item: TypeRecipes) => item.id === id);

  console.log(product.strCategory);

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
              <p
                data-testid="recipe-category"
              >
                {`${product.strCategory}: ${product.strAlcoholic}`}
              </p>
              <p data-testid="instructions">{ product.strInstructions }</p>
              {
                recipesProduts.map((value, index) => (
                  <div key={ index }>
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                    </p>
                  </div>
                ))
              }
              {
                product.strYoutube && (

                  <iframe
                    src={ product.strYoutube?.replace('watch?v=', 'embed/') as string }
                    allowFullScreen
                    title={ product[`str${recipePath}`] as string }
                    data-testid="video"
                  />
                )
              }
              {
                recomended.slice(0, 6).map((recipe, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <img
                      src={ recipe[`str${pathInverse}Thumb`] as string }
                      alt={ recipe[`str${pathInverse}`] as string }
                    />
                    <h3
                      data-testid={ `${index}-recommendation-title` }
                    >
                      {recipe[`str${pathInverse}`]}
                    </h3>
                  </div>
                ))
              }
              {
                !getLocalStorage && (
                  <button
                    data-testid="start-recipe-btn"
                    onClick={ () => {} }
                  >
                    Start Recipe
                  </button>
                )
              }
            </form>
          </div>
        )
      }
    </div>
  );
}

export default RecipeDetails;
