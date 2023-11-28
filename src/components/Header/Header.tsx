import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import { addList } from '../../redux/actions';
import { Dispatch, Path } from '../../types';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const notSearch = ['/profile', '/done-recipes', '/favorite-recipes'];
  const [search, setSearch] = useState<boolean>(false);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const renderTitleEffect = (str: string) => str.charAt(1) + str.slice(2);
    const pathFilter = renderTitleEffect(pathname) as Path;
    dispatch(addList({ search: '', radio: 'ingredient' }, pathFilter));
  }, [dispatch, pathname]);

  const renderTitle = (str: string) => {
    if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      const replace = str.replace('-recipes', ' Recipes');
      return replace.charAt(1).toUpperCase() + replace.slice(2);
    }
    return str.charAt(1).toUpperCase() + str.slice(2);
  };

  const title = renderTitle(pathname);

  return (
    <div
      className="w-screen h-12
      bg-gradient-to-tr from-indigo-700
     via-blue-800 to-blue-700
      flex justify-around items-center
     shadow-gray-800 shadow-md
     "
    >
      <h1 data-testid="page-title">{ title }</h1>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => navigate('/profile') }
      />
      <div className="flex relative h-full items-center">
        { search && (
          <div className="absolute top-12 right-0 border border-black w-80">
            <SearchBar />
          </div>
        )}

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
    </div>
  );
}

export default Header;
