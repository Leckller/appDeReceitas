import { useLocation, useNavigate } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { BiSolidDrink } from 'react-icons/bi';

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <footer
      data-testid="footer"
      className="fixed w-screen bottom-0 bg-purple-800
      flex flex-row justify-center items-center gap-12
      backdrop-blur-sm h-10 z-50"
    >
      <button
        onClick={ () => {
          if (pathname === '/meals') {
            window.scrollTo(0, 0);
          }
          navigate('/meals');
        } }
        data-testid="meals-bottom-btn"
      >
        <GiMeal
          className="text-5xl text-yellow-300"
        />
      </button>
      <button
        className="text-5xl text-yellow-300"
        onClick={ () => {
          if (pathname === '/drinks') {
            window.scrollTo(0, 0);
          }
          navigate('/drinks');
        } }
      >
        <BiSolidDrink
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
