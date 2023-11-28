import { Link } from 'react-router-dom';
import { Drinks } from '../../types';

function Drink({ drinks }: { drinks: Drinks[] }) {
  return (
    <section className="flex w-screen flex-wrap gap-4 p-2">
      {drinks && drinks.slice(0, 12).map((d, i) => (
        <Link
          to={ `/drinks/${d.idDrink}` }
          key={ d.idDrink }
        >
          <article
            className="w-64 h-64 flex items-center flex-col
            justify-around border border-gray-900 rounded-md"
            data-testid={ `${i}-recipe-card` }
          >
            <img
              className="w-1/2"
              src={ d.strDrinkThumb }
              alt={ d.strDrink }
              data-testid={ `${i}-card-img` }
            />
            <h1 data-testid={ `${i}-card-name` }>
              {d.strDrink}
            </h1>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default Drink;
