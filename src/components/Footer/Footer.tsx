import { useNavigate } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className="fixed w-screen bottom-0 bg-transparent
      flex flex-row justify-center items-center gap-5
      backdrop-blur-sm h-9"
    >
      <input
        onClick={ () => navigate('/meals') }
        data-testid="meals-bottom-btn"
        type="image"
        className="footer-icon"
        src={ mealIcon }
        alt="Comidas"
      />
      <input
        onClick={ () => navigate('/drinks') }
        data-testid="drinks-bottom-btn"
        type="image"
        className=""
        src={ drinkIcon }
        alt="Bebidas"
      />
    </footer>
  );
}

export default Footer;
