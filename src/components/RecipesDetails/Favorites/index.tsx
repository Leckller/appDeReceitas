import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Dispatch, Favorite, GlobalState, Path, Unions } from '../../../types';
import { setAnyFilterInGlobal } from '../../../redux/actions';
import { useFavorites } from '../../../utils/FunsFavorites';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { route } from '../../../utils/FuncsAll';
import shareIcon from '../../../images/shareIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function Favorites() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  const { getItem, setItem } = useLocalStorage<Unions>();
  const filters = useSelector((state: GlobalState) => state.filters);
  const { verifyFavorite, removeFavorite } = useFavorites();
  const favorite = (getItem('favoriteRecipes') as Favorite[] || []);

  const setFavoriteRecipes = (paths: Path) => {
    return filters.map((filter) => ({
      id: filter[`id${paths}`],
      type: paths,
      nationality: filter.strArea || '',
      category: filter.strCategory || '',
      alcoholicOrNot: filter.strAlcoholic || '',
      name: filter[`str${paths}`],
      image: filter[`str${paths}Thumb`],
    })) as Favorite[];
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(setAnyFilterInGlobal(
      { key: 'id' },
      route(pathname),
      id,
    ));
    return verifyFavorite(favorite, id as string)
      ? setItem('favoriteRecipes', removeFavorite(favorite, id as string))
      : setItem(
        'favoriteRecipes',
        setFavoriteRecipes(route(pathname)),
      );
  };
  return (
    <div>
      <input
        type="image"
        src={ shareIcon }
        alt="share"
        data-testid="share-btn"
        onClick={ () => {} }
      />
      <input
        type="image"
        src={ verifyFavorite(favorite, id as string) ? blackHeartIcon
          : whiteHeartIcon }
        alt="favorite"
        data-testid="favorite-btn"
        onClick={ handleClick }
      />
    </div>
  );
}

export default Favorites;
