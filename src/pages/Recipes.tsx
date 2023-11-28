import { useLocation } from 'react-router-dom';
import Drink from '../components/Recipes/Drink';
import Meal from '../components/Recipes/Meal';

function Recipes() {
  const { pathname } = useLocation();

  return (
    <div className="bg-blue-200 h-screen overflow-y-auto">
      <div>Recipes</div>
      {pathname === '/meals' ? (
        <Meal />
      ) : (
        <Drink />
      )}
    </div>
  );
}

export default Recipes;
