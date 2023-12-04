import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Favorite } from '../../types';
import shareIcon from '../../images/shareIcon.svg';

function HeaderCard({ url, index, recipe }:
{ url:string, index:number, recipe: Favorite }) {
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
    <div className="w-full flex flex-row flex-wrap">
      <div className="flex flex-row w-full justify-between ">
        <Link to={ url }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
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
      </div>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
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
