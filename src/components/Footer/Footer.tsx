import { useNavigate } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { BiSolidDrink } from 'react-icons/bi';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className="fixed w-screen bottom-0 bg-purple-800
      flex flex-row justify-center items-center gap-12
      backdrop-blur-sm h-10 z-50"
    >
      <GiMeal
        className="text-5xl text-yellow-300"
        onClick={ () => navigate('/meals') }
        data-testid="meals-bottom-btn"
      />
      <BiSolidDrink
        className="text-5xl text-yellow-300"
        onClick={ () => navigate('/drinks') }
        data-testid="drinks-bottom-btn"
      />
    </footer>
  );
}

export default Footer;
