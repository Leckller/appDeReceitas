import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useFavorite from '../../hooks/useFavorite';

function Products() {
  const { id } = useParams();
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
    <div>
      <header className="flex w-screen flex-col justify-center relative">
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
          className="absolute top-3 left-5"
        />
        <input
          className="absolute top-3 right-5"
          type="image"
          src={ verifyFavorite(id)
            ? blackHeartIcon : whiteHeartIcon }
          alt={ verifyFavorite(id)
            ? 'Black Heart Icon' : 'White Heart Icon' }
          data-testid="favorite-btn"
          onClick={ () => changeFavorite(id) }
        />
        <img
          className="brightness-50"
          data-testid="recipe-photo"
          src={ product[`str${route(pathname)}Thumb`] as string }
          alt={ product[`str${route(pathname)}`] as string }
        />
      </header>
      <div className="-translate-y-48 bg-white flex flex-col items-center gap-5">

        <h1
          className="mt-5"
          data-testid="recipe-title"
        >
          { product[`str${route(pathname)}`] }
        </h1>

        <p
          data-testid="recipe-category"
        >
          {product.strAlcoholic ? product.strAlcoholic : product.strCategory}
        </p>

        <p
          data-testid="instructions"
          className="w-96"
        >
          { product.strInstructions }

        </p>
      </div>
    </div>
  );
}

export default Products;
