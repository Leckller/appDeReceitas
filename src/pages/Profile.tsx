import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../utils/localStorage';

function Profile() {
  const navigate = useNavigate();
  const handleDoneNavigateClick = () => {
    navigate('/done-recipes');
  };
  const handleFavoriteNavigateClick = () => {
    navigate('/favorite-recipes');
  };
  const handleLogoutNavigteClick = () => {
    removeItem('user');
    navigate('/');
  };
  // Obtendo o email do localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = storedUser.email || '';

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {/* Exibindo o email */}
      <div data-testid="profile-email">{userEmail}</div>
      {/* Restante dos botões */}
      <button
        data-testid="profile-done-btn"
        onClick={ handleDoneNavigateClick }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteNavigateClick }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogoutNavigteClick }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
