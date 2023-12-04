import { useEffect, useState } from 'react';
import { getItem } from '../utils/localStorage';
import Card from '../components/doneRecipes/Card';
import { Favorite } from '../types';

function DoneRecipes() {
  const [doneRec, setDoneRec] = useState<Favorite[]>([]);
  useEffect(() => {
    setDoneRec(getItem('doneRecipes'));
  }, []);
  console.log(doneRec);
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-5 gap-5">
      <div className="w-screen flex flex-row justify-center gap-10">
        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRec(getItem('doneRecipes')) }
        >
          All
        </button>
        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setDoneRec([...doneRec.filter((rec) => rec.type === 'meal')]);
          } }
        >
          Meals
        </button>
        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setDoneRec([...doneRec.filter((rec) => rec.type === 'drink')]);
          } }
        >
          Drinks
        </button>
      </div>
      <div className="flex flex-col w-full p-5">
        {doneRec && doneRec.map((recipe, index) => (
          <Card index={ index } recipe={ recipe } key={ recipe.id } />
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
