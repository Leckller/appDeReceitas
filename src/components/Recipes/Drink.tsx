import { useSelector } from 'react-redux';
import { Drinks, GlobalState } from '../../types';

function Drink() {
  const drinks = useSelector((state:
  GlobalState) => state.recipesReducer.recipes as Drinks[]);

  return (
    <section className="flex w-screen flex-wrap gap-4 p-2">
      {drinks && drinks.slice(0, 12).map((d, i) => (
        <article
          className="w-64 h-64 flex items-center flex-col
            justify-around border border-gray-900 rounded-md"
          data-testid={ `${i}-recipe-card` }
          key={ d.idDrink }
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
      ))}
    </section>
  );
}

export default Drink;
