import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Dispatch, GlobalState, Progress, TypeRecipes } from '../types';
import { getRecipes, setAnyFilterInGlobal } from '../redux/actions';
import { getItem } from '../utils/localStorage';
import { path, route, routeInverse } from '../utils/FuncsAll';
import Products from '../components/RecipesDetails';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useFavorite from '../hooks/useFavorite';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { host, protocol } = window.location;
  const { changeFavorite, verifyFavorite } = useFavorite();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const recipes = useSelector((state: GlobalState) => state.recipes);
  const filters = useSelector((state: GlobalState) => state.filters);
  const [actRecomend, setActRecomend] = useState(0);
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';

  const url = `${protocol}//${host}${pathname}`;

  useEffect(() => {
    dispatch(getRecipes({ key: 'name' }, routeInverse(pathname)));
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  const product = filters[0] || {};

  const getDoneRecipes = (getItem('doneRecipes') as TypeRecipes[])
    .some((item) => item.id === id);

  const progress: Progress = (getItem('inProgressRecipes') as Progress) || {};

  const getRecipesInProgress = progress[path(pathname)] && Object.prototype.hasOwnProperty
    .call(progress[path(pathname)], id as string);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const images = recipes.slice(actRecomend, actRecomend + 2);
  return (
    <div>
      <h1>{keyPage}</h1>
      {
        product && (
          <div>
            <input
              type="image"
              src={ shareIcon }
              alt="share"
              data-testid="share-btn"
              onClick={ () => {
                navigator.clipboard.writeText(url);
                Toast.fire({
                  icon: 'success',
                  title: 'Link copied!',
                });
              } }
            />
            <input
              type="image"
              src={ verifyFavorite() ? blackHeartIcon
                : whiteHeartIcon }
              alt={ verifyFavorite() ? 'Black Heart Icon'
                : 'White Heart Icon' }
              data-testid="favorite-btn"
              onClick={ changeFavorite }
            />
            <Products />
            <div className="w-screen flex flex-col h-96">
              <div className="flex justify-around">
                <button
                  onClick={ () => {
                    if (actRecomend === 0) {
                      setActRecomend(5);
                    } else {
                      setActRecomend(actRecomend - 1);
                    }
                  } }
                >
                  Previus
                </button>

                <button
                  onClick={ () => {
                    if (actRecomend === 5) {
                      setActRecomend(0);
                    } else {
                      setActRecomend(actRecomend + 1);
                    }
                  } }
                >
                  Next
                </button>

              </div>
              <div className="flex flex-row justify-around">
                {
                images.map((recipe, index) => (
                  <div
                    className="w-96"
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
              </div>
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
