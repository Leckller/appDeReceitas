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
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  const urlInverse = `${protocol}//${host}/${pathInverse(pathname)}/`;

  const getDoneRecipes = (getItem('doneRecipes') as TypeRecipes[])
    .some((item) => item.id === id);

  const progress: Progress = (getItem('inProgressRecipes') as Progress);

  const getRecipesInProgress = progress[path(pathname)] && Object.prototype.hasOwnProperty
    .call(progress[path(pathname)], id as string);

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <h1>{keyPage}</h1>
      {
        product && (
          <div className="flex flex-col items-start border-4 border-black">
            <Products />
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
                    title={ product[`str${route(pathname)}`] as string }
                    data-testid="video"
                  />
                )
              }
            <div
              className="flex flex-col flex-wrap overflow-x-scroll h-48 w-96
              overflow-y-hidden"
            >
              {
              recipes.slice(0, 6).map((recipe, index) => (
                <Link
                  key={ index }
                  to={ `${urlInverse}${recipe[`id${routeInverse(pathname)}`]}` as string }
                  data-testid={ `${index}-recommendation-card` }
                  className="w-48 h48"
                >
                  <img
                    src={ recipe[`str${routeInverse(pathname)}Thumb`] as string }
                    alt={ recipe[`str${routeInverse(pathname)}`] as string }
                  />
                  <h3
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {recipe[`str${routeInverse(pathname)}`]}
                  </h3>
                </Link>
              ))
              }
            </div>
            {
                !getDoneRecipes && (
                  <button
                    data-testid="start-recipe-btn"
                    className="fixed bottom-0"
                    onClick={ () => navigate(`${pathname}/in-progress`) }
                  >
                    {
                      !getRecipesInProgress ? 'Start Recipe' : 'Continue Recipe'
                    }
                  </button>
                )
              }
          </div>
        )
      }
    </div>
  );
}

export default RecipeDetails;
