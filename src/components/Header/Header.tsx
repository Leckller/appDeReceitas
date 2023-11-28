import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const notSearch = ['/profile', '/done-recipes', '/favorite-recipes'];
  const [search, setSearch] = useState<boolean>(false);

  const renderTitle = (str: string) => {
    if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      const replace = str.replace('-recipes', ' Recipes');
      return replace.charAt(1).toUpperCase() + replace.slice(2);
    }
    return str.charAt(1).toUpperCase() + str.slice(2);
  };

  const title = renderTitle(pathname);

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => navigate('/profile') }
      />
      { search && (<SearchBar />)}
      {
          !notSearch.includes(pathname) && (
            <input
              type="image"
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
              onClick={ () => setSearch(!search) }
            />
          )
      }
    </div>
  );
}

export default Header;
