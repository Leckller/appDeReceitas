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
    <header
      className="w-screen h-16
      flex justify-around items-center relative
      bg-yellow-300
      "
      id="header"
    >
      {/* <h1 data-testid="page-title">{ title }</h1> */}
      <div className="flex flex-row items-center justify-center">
        <img
          src={ logo }
          alt="logo"
          className=" w-20
       scale-75"
        />
        <div className="flex -translate-x-2 gap-1 items-center pt-2 text-purple-800">
          <span className="text-3xl font-thin">
            RECIPES
          </span>
          <span className="text-xl font-extrabold text-purple-800">
            app
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-10 items-center justify-center">
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
    </header>
  );
}

export default Header;
