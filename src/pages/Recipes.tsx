import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Drink from '../components/Recipes/Drink';
import Meal from '../components/Recipes/Meal';
import { Categorias } from '../types';

function Recipes() {
  const { pathname } = useLocation();
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const title = pathname.slice(1);
  useEffect(() => {
    const effect = async () => {
      const dataCat = title === 'meals' ? await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list') : await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const resp = await dataCat.json();
      console.log(resp[title]);
      setCategorias(resp[title]);
    };
    effect();
  }, []);

  return (
    <div className="bg-blue-200 h-screen overflow-y-auto">
      <div>
        {categorias && categorias.slice(0, 5).map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
          >
            {strCategory}
          </button>
        ))}
      </div>
      {pathname === '/meals' ? (
        <Meal />
      ) : (
        <Drink />
      )}
    </div>
  );
}

export default Recipes;
