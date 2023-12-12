import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
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
      <button
        data-testid="profile-top-btn"
        onClick={ () => navigate('/profile') }
      >
        <FaRegUserCircle className="text-5xl" />
      </button>
      <div className="flex h-full items-center">

        {
          !notSearch.includes(pathname) && (
            <button
              data-testid="search-top-btn"
              onClick={ () => dispatch(setSearchBar()) }
            >
              <IoSearchSharp className="text-5xl" />
            </button>
          )
      }
      </div>
    </div>
  );
}

export default Header;
