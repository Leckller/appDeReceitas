import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalState, Progress, TypeRecipes } from '../types';
import { setAnyFilterInGlobal } from '../redux/actions';
import { getItem } from '../utils/localStorage';
import { filterAll, path, pathInverse, route, routeInverse } from '../utils/FuncsAll';
import Products from '../components/Products';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { host, protocol } = window.location;
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const [recipes, setRecipes] = useState<TypeRecipes[]>([]);
  const product = useSelector((state: GlobalState) => state.filters)[0] || {};
  // const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
  //   : 'Details Drinks';

  const urlInverse = `${protocol}//${host}/${pathInverse(pathname)}/`;

  const getDoneRecipes = (getItem('doneRecipes') as TypeRecipes[])
    .some((item) => item.id === id);

  const progress: Progress = (getItem('inProgressRecipes') as Progress) || {};

  const getRecipesInProgress = progress[path(pathname)] && Object.prototype.hasOwnProperty
    .call(progress[path(pathname)], id as string);

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  useEffect(() => {
    (async () => {
      const data = await filterAll({ key: 'name' }, routeInverse(pathname));
      setRecipes(data);
    })();
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  return (
    <div>
      {
        product && (
          <div className="flex flex-col items-center">
            <div className="bg-white flex flex-col">
              <Products />
              <div
                className="-translate-y-56 bg-white
               flex flex-col items-center gap-5 h-full pr-10 pl-10"
              >

                <p
                  data-testid="recipe-category"
                >
                  {product.strAlcoholic ? product.strAlcoholic : product.strCategory}
                </p>

                <div className="w-full border-2 border-gray-400 pl-5 p-1 rounded-lg">
                  <h2>Ingredients</h2>
                  {
                recipesProduts.map((value, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                  </li>
                ))
              }
                </div>
                <div
                  className="w-full max-h-96 border-2 border-gray-400 pl-5 p-3 rounded-lg
                overflow-y-auto"
                >
                  <p
                    data-testid="instructions"
                    className="w-full"
                  >
                    { product.strInstructions }

                  </p>
                </div>
              </div>

              <section className="-translate-y-52 flex flex-col items-center">

                <div className="flex flex-col w-screen items-start justify-center p-10">
                  <h2>Video</h2>
                  {
                product.strYoutube && (
                  <iframe
                    className="w-full h-72"
                    src={ product.strYoutube?.replace('watch?v=', 'embed/') as string }
                    allowFullScreen
                    title={ product[`str${route(pathname)}`] as string }
                    data-testid="video"
                  />
                )
}
                </div>
                <div
                  className="flex flex-col flex-wrap overflow-x-scroll h-48 w-96
              overflow-y-hidden gap-8 pl-1 pt-1"
                >
                  {
              recipes.slice(0, 6).map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `${urlInverse}${recipe[`id${routeInverse(pathname)}`]}` as string }
                  data-testid={ `${index}-recommendation-card` }
                  className="w-40 scale-105 border border-gray-400 rounded-t-xl"
                >
                  <img
                    className="rounded-t-xl"
                    src={ recipe[`str${routeInverse(pathname)}Thumb`] as string }
                    alt={ recipe[`str${routeInverse(pathname)}`] as string }
                  />
                  <h3
                    className="text-center bg-white rounded-b-xl"
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {recipe[`str${routeInverse(pathname)}`]}
                  </h3>
                </Link>
              ))
              }
                </div>

              </section>
            </div>
            <div className="flex flex-row items-center w-screen justify-center">
              {
                !getDoneRecipes && (
                  <button
                    data-testid="start-recipe-btn"
                    className="fixed bottom-0 bg-yellow-300 h-12 w-full"
                    onClick={ () => navigate(`${pathname}/in-progress`) }
                  >
                    {
                      !getRecipesInProgress ? 'Start Recipe' : 'Continue Recipe'
                    }
                  </button>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
}

export default RecipeDetails;
