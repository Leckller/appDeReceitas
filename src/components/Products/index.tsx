import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiShare2 } from 'react-icons/fi';
import { CiHeart } from 'react-icons/ci';
import { IoHeart } from 'react-icons/io5';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';
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
      <header className="flex w-screen items-center flex-col justify-center relative">
        <button
          data-testid="share-btn"
          onClick={ () => {
            navigator.clipboard.writeText(url);
            Toast.fire({
              icon: 'success',
              title: 'Link copied!',
            });
          } }
        >
          <FiShare2
            className="absolute top-3 z-20 left-5 text-3xl text-yellow-300"
          />
        </button>
        {verifyFavorite(id)
          ? (
            <button
              data-testid="favorite-btn"
              onClick={ () => changeFavorite(id) }
            >
              <IoHeart
                className="absolute top-3 z-20 right-5 text-3xl text-yellow-300"
              />
            </button>
          ) : (
            <button
              data-testid="favorite-btn"
              onClick={ () => changeFavorite(id) }
            >
              <CiHeart
                className="absolute top-3 z-20 right-5 text-3xl text-yellow-300"
              />
            </button>
          )}
        <img
          className="brightness-50"
          data-testid="recipe-photo"
          src={ product[`str${route(pathname)}Thumb`] as string }
          alt={ product[`str${route(pathname)}`] as string }
        />
        <h1
          className="absolute top-20 text-white text-xl scale-110 font-extrabold"
          data-testid="recipe-title"
        >
          { product[`str${route(pathname)}`] }
        </h1>
      </header>
      <div
        className="-translate-y-56 bg-white
                      flex flex-col items-center gap-5 pr-10 pl-10
                      mb-5 h-60"
      >

        <p
          className="mt-5 text-lg"
          data-testid="recipe-category"
        >
          {product.strAlcoholic ? product.strAlcoholic : product.strCategory}
        </p>
        <div
          className="w-full max-h-96 border-2 border-gray-400 pl-5 p-3 rounded-lg
                overflow-y-auto"
        >
          <p
            data-testid="instructions"
            className="w-full"
          >
            { product.strInstructions }

          </p>
        </div>
      </div>
    </div>
  );
}

export default Products;
