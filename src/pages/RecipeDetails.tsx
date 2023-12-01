import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Favorite, GlobalState, Progress, TypeRecipes } from '../types';
import { getRecipes, setAnyFilterInGlobal } from '../redux/actions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { route, routeInverse } from '../utils';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

type Unions = Favorite[] | Progress | TypeRecipes[];

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getItem, setItem, removeItem } = useLocalStorage<Unions>();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const recipes = useSelector((state: GlobalState) => state.recipes);
  const filters = useSelector((state: GlobalState) => state.filters);
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  useEffect(() => {
    dispatch(getRecipes({ key: 'name' }, routeInverse(pathname)));
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  }, [pathname, id]);

  const product = filters[0] || {};

  const path = pathname.includes('/meals') ? 'meals' : 'drinks';

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  const getDoneRecipes = (getItem('doneRecipes') as TypeRecipes[])
    .some((item) => item.id === id);

  const progress: Progress = (getItem('inProgressRecipes') as Progress) || {};

  const getRecipesInProgress = progress[path] && Object.prototype.hasOwnProperty
    .call(progress[path], id as string);

  const setFavoriteRecipes = filters
    .map((filter) => ({
      id: filter[`id${route(pathname)}`],
      type: route(pathname),
      nationality: filter.strArea || '',
      category: filter.strCategory || '',
      alcoholicOrNot: filter.strAlcoholic || '',
      name: filter[`str${route(pathname)}`],
      image: filter[`str${route(pathname)}Thumb`],
    })) as Favorite[];

  const verifyFavorite = (getItem('favoriteRecipes') as Favorite[] || [])
    .some((favorite) => favorite.id === id);

  const removeFavorite = (getItem('favoriteRecipes') as Favorite[] || [])
    .filter((favorite: Favorite) => favorite.id !== id);

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(setAnyFilterInGlobal(
      { key: 'id' },
      route(pathname),
      id,
    ));
    return verifyFavorite
      ? setItem('favoriteRecipes', removeFavorite)
      : setItem('favoriteRecipes', setFavoriteRecipes);
  };

  return (
    <div>
      <h1>{keyPage}</h1>
      {
        product && (
          <div>
            <form>
              <input
                type="image"
                src={ shareIcon }
                alt="share"
                data-testid="share-btn"
                onClick={ () => {} }
              />
              <input
                type="image"
                src={ verifyFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
                data-testid="favorite-btn"
                onClick={ handleClick }
              />
              <img
                data-testid="recipe-photo"
                src={ product[`str${route(pathname)}Thumb`] as string }
                alt={ product[`str${route(pathname)}`] as string }
              />
              <h1
                data-testid="recipe-title"
              >
                { product[`str${route(pathname)}`] }
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
                    title={ product[`str${route(pathname)}`] as string }
                    data-testid="video"
                  />
                )
              }
              {
                recipes.slice(0, 6).map((recipe, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
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
                  </div>
                ))
              }
              {
                !getDoneRecipes && (
                  <button
                    data-testid="start-recipe-btn"
                    className="fixed top-4 right-0"
                    onClick={ () => navigate(`${pathname}/in-progress`) }
                  >
                    {
                      !getRecipesInProgress ? 'Start Recipe' : 'Continue Recipe'
                    }
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
