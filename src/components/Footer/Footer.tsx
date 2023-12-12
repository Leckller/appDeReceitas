import { useLocation, useNavigate } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { BiSolidDrink } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setVisibleRecipes } from '../../redux/actions';

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <footer
      data-testid="footer"
      className="fixed w-screen bottom-0 bg-purple-900
      flex flex-row justify-center items-center gap-12
      backdrop-blur-sm h-10 z-50"
    >
      <button
        onClick={ () => {
          if (pathname === '/meals') {
            window.scrollTo(0, 0);
          } else {
            navigate('/meals');
            dispatch(setVisibleRecipes(true));
          }
        } }
        data-testid="meals-bottom-btn"
      >
        <GiMeal
          className="text-5xl text-yellow-300 scale-90"
        />
      </button>
      <div className="border-2 border-yellow-300 rounded-md">
        <h2 className="text-yellow-300 pl-1 pr-1">
          {pathname.split('/')[1]}
        </h2>
      </div>
      <button
        onClick={ () => {
          if (pathname === '/drinks') {
            window.scrollTo(0, 0);
          } else {
            navigate('/drinks');
            dispatch(setVisibleRecipes(true));
          }
        } }
      >
        <BiSolidDrink
          className="text-5xl text-yellow-300 scale-90"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
