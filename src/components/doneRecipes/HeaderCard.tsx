import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { Favorite } from '../../types';
import useFavorite from '../../hooks/useFavorite';

function HeaderCard({ url, index, recipe, like }:
{ url:string, index:number, recipe: Favorite, like: boolean }) {
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
  const { changeFavorite } = useFavorite();

  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className="flex flex-row w-full justify-between relative">
        <Link to={ url }>
          <h2 data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </h2>
        </Link>
        <div
          className={ `${like ? 'absolute top-32' : ''}
            gap-5 flex
          ` }
        >
          <FiShare2
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(url);
              Toast.fire({
                icon: 'success',
                title: 'Link copied!',
              });
            } }
            className="text-3xl text-yellow-300"
          />
          {like && (
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => changeFavorite(recipe.id) }
            >
              <FaHeart className="text-3xl text-yellow-300" />

            </button>
          )}
        </div>
      </div>
      <h3 className="text-gray-500" data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'meal' ? (
          `${recipe.nationality} - ${recipe.category}`
        ) : (
          recipe.alcoholicOrNot
        )}

      </h3>
    </div>
  );
}

export default HeaderCard;
