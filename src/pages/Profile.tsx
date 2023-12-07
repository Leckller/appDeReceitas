import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from '../utils/localStorage';

function Profile() {
  const navigate = useNavigate();

  // Obtendo o email do localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = storedUser.email || '';

  return (
    <div className="profile-container">
      {/* Exibindo o email */}
      <div data-testid="profile-email">{userEmail}</div>
      {/* Restante dos botões */}
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => { clearStorage(); navigate('/'); } }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
