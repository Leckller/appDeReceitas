import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Receita from '../components/Recipes/Receita';
import { filterAll, route } from '../utils/FuncsAll';

function RecipesInProgress() {
  const { pathname } = useLocation();

  const [item, setItem] = useState([]);

  useEffect(() => {
    const effect = async () => {
      const response = await filterAll(
        { key: 'id', search: '' },
        route(pathname),
        pathname.split('/')[2],
      );
      setItem(response);
    };
    effect();
  }, []);

  return (
    <div>
      {item[0] && <Receita product={ item[0] } />}
      <button data-testid="finish-recipe-btn">finish</button>
    </div>
  );
}

export default RecipesInProgress;
