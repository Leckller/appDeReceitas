import { useEffect, useState } from 'react';

function Meal() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const effect = async () => {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const resp = await data.json();
      setMeals(resp.meals);
      console.log(resp.meals);
    };
    effect();
  }, []);
  return (
    <section className="flex w-screen flex-wrap gap-4 p-2">
      {meals && meals.slice(0, 12).map((d, i) => (
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
      ))}
    </section>
  );
}

export default Meal;
