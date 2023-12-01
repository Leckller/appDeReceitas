import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { GlobalState, TypeRecipes } from '../../types';
import { route } from '../../utils/FuncsAll';
import { useProgress } from '../../hooks/useProgress';
import { getItem } from '../../utils/localStorage';
import useFavorite from '../../hooks/useFavorite';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import useDoneRecipes from '../../hooks/useDoneRecipes';

function Receita() {
  const { pathname } = useLocation();
  const { saveProgress } = useProgress();
  const { host, protocol } = window.location;
  const { id } = useParams();
  const { changeFinish } = useDoneRecipes();
  const { changeFavorite, verifyFavorite } = useFavorite();
  const navigate = useNavigate();
  const product: TypeRecipes = useSelector((state: GlobalState) => state.filters)[0]
  || {};
  const [productCheck, setproductCheck] = useState<string[]>([]);

  const url = `${protocol}//${host}${pathname}`.split('/in-progress')[0];

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  const changeChecked = (name: string, index: number) => {
    let checked = [] as string[];
    if (!productCheck.some((item) => item.includes(`item-${index}`))) {
      checked = [...productCheck,
        `item-${index} ${name} ${product[`strMeasure${index + 1}`]}`];
    }
    if (productCheck.some((item) => item.includes(`item-${index}`))) {
      checked = [...productCheck
        .filter((i) => {
          return i.split(' ')[0] !== `item-${index}`;
        })];
    }

    setproductCheck(checked);
    saveProgress(checked);
  };

  useEffect(() => {
    const locateRecipe = [pathname.split('/')[1]];
    if (getItem('inProgressRecipes')[locateRecipe] !== undefined) {
      setproductCheck(getItem('inProgressRecipes')[locateRecipe][id]);
    }
  }, []);

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
    <div className="">
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
          className="w-8 absolute top-3 left-5"
        />
        <input
          type="image"
          src={ verifyFavorite() ? blackHeartIcon
            : whiteHeartIcon }
          alt={ verifyFavorite() ? 'Black Heart Icon'
            : 'White Heart Icon' }
          data-testid="favorite-btn"
          onClick={ changeFavorite }
          className="w-8 absolute top-3 right-5"
        />
        <img
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
          {`${product.strCategory}: ${product.strAlcoholic}`}
        </p>

        <p
          data-testid="instructions"
          className="w-96"
        >
          { product.strInstructions }

        </p>

        {
                recipesProduts.map((value, index) => (
                  <div key={ index }>
                    <label
                      htmlFor={ value[1] as string + index }
                      data-testid={ `${index}-ingredient-step` }
                      className={
                        `${productCheck.some((item) => item.includes(`item-${index}`))
                          ? 'text-decoration: line-through solid rgb(0, 0, 0)' : ''}`
                    }
                    >
                      <p
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                      </p>
                      <input
                        checked={ productCheck
                          .some((item) => item.includes(`item-${index}`)) }
                        onChange={ () => changeChecked(value[1] as string, index) }
                        type="checkbox"
                        name={ value[1] as string }
                        id={ value[1] as string + index }
                      />
                    </label>
                  </div>
                ))
              }
      </div>
      <button
        className="fixed bottom-0 left-2/3 disabled:bg-red-400"
        data-testid="finish-recipe-btn"
        disabled={ recipesProduts.length !== productCheck.length }
        onClick={ () => {
          navigate('/done-recipes');
          changeFinish();
        } }
      >
        finish
      </button>
    </div>
  );
}

export default Receita;
