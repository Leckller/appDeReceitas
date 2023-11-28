import { Link } from 'react-router-dom';
import { Meals } from '../../types';

function Meal({ meals }: { meals: Meals[] }) {
  return (
    <section className="flex w-screen flex-wrap gap-4 p-2">
      {meals && meals.slice(0, 12).map((d, i) => (
        <Link
          to={ `/meals/${d.idMeal}` }
          key={ d.idMeal }

        >
          <article
            className="w-64 h-64 flex items-center flex-col
            justify-around
          bg-red-400"
            data-testid={ `${i}-recipe-card` }
          >
            <img
              className="w-1/2"
              src={ d.strMealThumb }
              alt={ d.strMeal }
              data-testid={ `${i}-card-img` }
            />
            <h1 data-testid={ `${i}-card-name` }>
              {d.strMeal}
            </h1>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default Meal;
