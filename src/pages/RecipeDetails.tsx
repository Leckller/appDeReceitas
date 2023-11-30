import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalState, TypeRecipes } from '../types';
import { getRecipes, setAnyFilterInGlobal } from '../redux/actions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { route, routeInverse } from '../utils';
import shareIcon from '../images/searchIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const recipes = useSelector((state: GlobalState) => state.recipes);
  const dispatch: Dispatch = useDispatch();
  const filters = useSelector((state: GlobalState) => state.filters);
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  useEffect(() => {
    dispatch(getRecipes({ key: 'name' }, route(pathname)));
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  }, [pathname, id]);

  const product = filters[0] || {};

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  const getDoneRecipes = getItem('doneRecipes')
    ?.some((item: TypeRecipes) => item.id === id);
  const getRecipesInProgress = getItem('inProgressRecipes')
    ?.some((item: TypeRecipes) => item.id === id);
  const startRecipes = !getDoneRecipes && !getRecipesInProgress;

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
                src={ blackHeartIcon }
                alt="favorite"
                data-testid="favorite-btn"
                onClick={ () => {} }
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
                startRecipes && (
                  <button
                    data-testid="start-recipe-btn"
                    onClick={ () => navigate(`${pathname}/in-progress`) }
                  >
                    Start Recipe
                  </button>
                )
              }
              {
                getRecipesInProgress && (
                  <button
                    data-testid="continue-recipe-btn"
                    onClick={ () => {} }
                  >
                    Continue Recipe
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
