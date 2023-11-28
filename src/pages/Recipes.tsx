import { useLocation } from 'react-router-dom';
import Drink from '../components/Recipes/Drink';
import Meal from '../components/Recipes/Meal';

function Recipes() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="bg-blue-200">
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
