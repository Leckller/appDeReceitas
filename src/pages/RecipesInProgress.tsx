import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyFilterInGlobal } from '../redux/actions';
import { path, route } from '../utils/FuncsAll';
import { Dispatch, GlobalState, Progress, TypeRecipes } from '../types';
import { useProgress } from '../hooks/useProgress';
import Products from '../components/Products';
import { getItem } from '../utils/localStorage';
import useFavorite from '../hooks/useFavorite';

function RecipesInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { saveProgress } = useProgress();
  const { changeFavorite } = useFavorite();

  const dispatch: Dispatch = useDispatch();
  const product: TypeRecipes = useSelector((state: GlobalState) => state.filters)[0]
  || {};
  const [productCheck, setproductCheck] = useState<string[]>([]);

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

  const isInProgress = () => {
    const inProgressRecipes = getItem('inProgressRecipes') as Progress || {};
    return inProgressRecipes[path(pathname)]?.[id as string];
  };

  const getCheckeds = () => {
    return isInProgress()
      .filter((checked) => productCheck
        .every((item) => item === checked));
  };

  useEffect(() => {
    if (isInProgress()) setproductCheck(getCheckeds());
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  return (
    <div className="flex flex-col items-center">
      <Products />
      {
                recipesProduts.map((value, index) => (
                  <div
                    key={ index }
                    className="flex justify-center items-center text-center"
                  >
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
                        className="invisible"
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
      <button
        data-testid="finish-recipe-btn"
        className="w-32 mb-4 transition ease-in-out
          delay-150 border-2 border-gray-700 hover:-translate-y-1
          hover:scale-110 duration-300 p-1 rounded-md
          shadow-lg
          "
        onClick={ changeFavorite }
      >
        finish
      </button>
    </div>
  );
}

export default RecipesInProgress;
