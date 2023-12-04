import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useFavorite from '../../hooks/useFavorite';

function Products() {
  const { pathname } = useLocation();
  const { host, protocol } = window.location;
  const { changeFavorite, verifyFavorite } = useFavorite();
  const product = useSelector((state: GlobalState) => state.filters)[0] || {};
  // const imageBg = `bg-[url(${product[`str${route(pathname)}Thumb`]})]`;
  const url = `${protocol}//${host}${pathname}`.split('/in-progress')[0];

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <header
      className={ `flex w-screen flex-col justify-center
      relative items-center` }
    >
      <input
        type="image"
        src={ shareIcon }
        alt="share"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(url);
          Toast.fire({
            icon: 'success',
            title: 'Link copied!',
          });
        } }
        className="absolute top-3 left-5 z-20"
      />
      <input
        className="absolute top-3 right-5 z-20"
        type="image"
        src={ verifyFavorite() ? blackHeartIcon
          : whiteHeartIcon }
        alt={ verifyFavorite() ? 'Black Heart Icon'
          : 'White Heart Icon' }
        data-testid="favorite-btn"
        onClick={ changeFavorite }
      />
      <img
        data-testid="recipe-photo"
        className="brightness-75 h-96 w-full -translate-y-16"
        src={ product[`str${route(pathname)}Thumb`] as string }
        alt={ product[`str${route(pathname)}`] as string }
      />
      <h1
        className="mt-5 absolute top-10 text-5xl font-semibold
         text-white brightness-100"
        data-testid="recipe-title"
      >
        { product[`str${route(pathname)}`] }
      </h1>
    </header>
  );
}

export default Products;
