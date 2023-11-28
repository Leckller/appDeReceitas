import { useSelector } from 'react-redux';
import { GlobalState, Meals } from '../../types';

function Meal() {
  const meals = useSelector((state:
  GlobalState) => state.recipesReducer.recipes as Meals[]);
  return (
    <section className="flex w-screen flex-wrap gap-4 p-2">
      {meals ? (
        meals
          .map((d, i) => (
            <article
              className="w-64 h-64 flex items-center flex-col
            justify-around
          bg-red-400"
              data-testid={ `${i}-recipe-card` }
              key={ d.idMeal }
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
          ))
      ) : (
        <h2>Faça uma pesquisa</h2>
      )}
    </section>
  );
}

export default Meal;
