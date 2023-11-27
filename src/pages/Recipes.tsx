import { useLocation } from 'react-router-dom';

function Recipes() {
  const { pathname } = useLocation();
  return (
    <div>Recipes</div>
  );
}

export default Recipes;
