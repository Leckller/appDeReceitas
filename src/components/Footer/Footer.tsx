import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';
import { setLoading } from '../../redux/actions';

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToMeals = () => {
    dispatch(setLoading(true));
    navigate('/meals');
  };

  const handleNavigateToDrinks = () => {
    dispatch(setLoading(true));
    navigate('/drinks');
  };

  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f2f2f2' } }
    >
      <div className="footer-container">
        <input
          onClick={ handleNavigateToMeals }
          data-testid="meals-bottom-btn"
          type="image"
          className="footer-icon"
          src={ mealIcon }
          alt="Comidas"
        />
        <input
          onClick={ handleNavigateToDrinks }
          data-testid="drinks-bottom-btn"
          type="image"
          className="footer-icon"
          src={ drinkIcon }
          alt="Bebidas"
        />
      </div>
    </footer>
  );
}

export default Footer;
