/* eslint-disable react/jsx-max-depth */
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { Favorite } from '../../types';
import shareIcon from '../../images/shareIcon.svg';

function Card({ index, recipe }: { index: number, recipe:Favorite }) {
  const { host, protocol } = window.location;
  const { pathname } = useLocation();
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

  const url = `${protocol}//${host}/${recipe.type}s/${recipe.id}`;
  console.log(pathname);
  return (
    <div className="flex flex-row w-full border border-gray-400 rounded-xl">
      <div className="w-1/2">
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <div className="w-1/2 p-2 flex flex-col">

        <div className="w-full flex flex-row flex-wrap">
          <div className="flex flex-row w-full justify-between ">
            <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
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

        <div className="flex flex-col justify-around h-full">
          <h4 data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate?.split('T')[0]}
          </h4>

          <div className="flex flex-row gap-5">
            {recipe.tags && recipe.tags.map((tag) => (
              <h5
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </h5>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Card;
