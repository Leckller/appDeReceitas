import { useNavigate } from 'react-router-dom';
import { MdDone, MdLogout } from 'react-icons/md';
import { FaHeart, FaRegUserCircle } from 'react-icons/fa';
import { clearStorage } from '../utils/localStorage';

function Profile() {
  const navigate = useNavigate();

  // Obtendo o email do localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = storedUser.email || '';

  return (
    <main className="mt-10 flex flex-col items-center justify-center text-center">
      <div
        className="w-96 flex flex-col gap-2 font-bold
       items-center justify-center text-yellow-300 text-2xl"
      >
        <div>
          <FaRegUserCircle className="text-5xl" />
        </div>
        <h1>
          Profile
        </h1>
      </div>
      <div className="profile-container flex flex-col">
        {/* Exibindo o email */}
        <div
          data-testid="profile-email"
          className="h-24 flex flex-row items-center
           border-b border-gray-400 gap-3 w-96 justify-center
           font-bold"
        >
          {userEmail}
        </div>
        {/* Restante dos botões */}
        <div
          className="h-24 flex flex-row gap-3 items-center
                 border-b border-gray-400 w-96 justify-start pl-20"
        >
          <div className="w-10 h-10 rounded-full border-2 border-yellow-300">
            <MdDone className="text-6xl text-yellow-300 -translate-x-1 -translate-y-5" />
          </div>
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            Done Recipes

          </button>

        </div>
        <div
          className="h-24 flex flex-row gap-3 items-center
                 border-b border-gray-400 w-96 justify-start pl-20"
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-yellow-300
             flex items-center justify-center text-yellow-300"
          >
            <FaHeart className="text-xl" />
          </div>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            Favorite Recipes

          </button>

        </div>
        <div
          className="h-24 flex flex-row gap-3 items-center w-96 justify-start pl-20"
        >
          <div
            className="w-10 h-10 rounded-full border-2 border-yellow-300
             flex items-center justify-center text-yellow-300"
          >
            <MdLogout className="text-xl" />
          </div>
          <button
            data-testid="profile-logout-btn"
            onClick={ () => { clearStorage(); navigate('/'); } }
          >
            Logout

          </button>
        </div>

      </div>
    </main>
  );
}

export default Profile;
