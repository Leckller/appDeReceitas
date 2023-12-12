import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../assets/logoPintada2-removebg-preview.png';
import { setSearchBar } from '../../redux/actions';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const notSearch = ['/profile', '/done-recipes', '/favorite-recipes'];
  const dispatch = useDispatch();
  // const renderTitle = (str: string) => {
  //   if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
  //     const replace = str.replace('-recipes', ' Recipes');
  //     return replace.charAt(1).toUpperCase() + replace.slice(2);
  //   }
  //   return str.charAt(1).toUpperCase() + str.slice(2);
  // };

  // const title = renderTitle(pathname);

  return (
    <div
      className="w-screen h-16
      flex justify-around items-center relative
      "
    >
      {/* <h1 data-testid="page-title">{ title }</h1> */}
      <img
        src={ logo }
        alt="logo"
        className=" w-20
       top-0 absolute"
      />
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => navigate('/profile') }
      />
      <div className="flex h-full items-center">

        {
          !notSearch.includes(pathname) && (
            <input
              type="image"
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
              onClick={ () => dispatch(setSearchBar()) }
            />
          )
      }
      </div>
    </div>
  );
}

export default Header;
