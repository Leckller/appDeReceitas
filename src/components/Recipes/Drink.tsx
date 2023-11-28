import { useEffect, useState } from 'react';
import { Drinks } from '../../types';

function Drink() {
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  useEffect(() => {
    const effect = async () => {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const resp = await data.json();
      setDrinks(resp.drinks);
    };
    effect();
  }, []);
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
