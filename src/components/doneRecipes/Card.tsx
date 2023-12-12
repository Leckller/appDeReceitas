import { Link } from 'react-router-dom';
import { Favorite } from '../../types';
import HeaderCard from './HeaderCard';

function Card({ index, recipe, like = false }: {
  index: number, recipe:Favorite, like?: boolean }) {
  const { host, protocol } = window.location;
  const url = `${protocol}//${host}/${recipe.type}s/${recipe.id}`;
  return (
    <div
      className="flex flex-row w-96 border border-gray-400 rounded-xl"
      data-testid="recipe-card"
    >
      <Link to={ url } className="w-1/2" data-testid="image-link">
        <img
          className="w-full h-full rounded-l-xl"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="w-1/2 p-2 flex flex-col">

        <HeaderCard
          like={ like }
          index={ index }
          recipe={ recipe }
          url={ url }
          key={ recipe.id }
        />
        {!like
          && (
            <div className="flex flex-col text-gray-500 justify-around h-full">
              <h4 data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate?.split('T')[0]}
              </h4>

              <div className="flex flex-row flex-wrap gap-2">
                {recipe.tags && recipe.tags.map((tag) => (
                  <h5
                    className="bg-gray-300 rounded-xl p-1"
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </h5>
                ))}
              </div>

            </div>
          )}

      </div>
    </div>
  );
}

export default Card;
