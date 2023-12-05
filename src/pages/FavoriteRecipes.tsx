import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Favorite } from '../types';
import { getItem } from '../utils/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFavorite from '../hooks/useFavorite';

function FavoriteRecipes() {
  const { favorites, changeFavorite, setFavorites } = useFavorite();
  const { host, protocol } = window.location;
  const favoriteRecipes = getItem<Favorite[]>('favoriteRecipes');

  const handleClick = (string: string) => {
    setFavorites([...favoriteRecipes.filter((rec) => rec
      .type === string)] as Favorite[]);
  };

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
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFavorites(favoriteRecipes) }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleClick('meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('drink') }
      >
        Drinks

      </button>
      {
        favorites.length > 0 && favorites.map((item, index) => {
          const url = `${protocol}//${host}/${item.type}s/${item.id}`;
          return (
            <div key={ index }>
              <Link to={ url }>
                <img
                  className="h-32"
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.nationality || item.alcoholicOrNot} - ${item
                  .category}`}
              </p>
              <input
                src={ shareIcon }
                alt="shareIcon"
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
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
                src={ blackHeartIcon }
                alt="Black Heart Icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => changeFavorite(item.id) }
              />
            </div>
          );
        })
      }
    </div>
  );
}

export default FavoriteRecipes;
