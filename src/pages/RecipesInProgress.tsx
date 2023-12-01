import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyFilterInGlobal } from '../redux/actions';
import { route } from '../utils/FuncsAll';
import { Dispatch, GlobalState, TypeRecipes } from '../types';
import { useProgress } from '../hooks/useProgress';
import Products from '../components/RecipesDetails';

function RecipesInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { saveProgress } = useProgress();
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

  useEffect(() => {
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, id]);

  return (
    <div className="">
      <div className="-translate-y-48 bg-white flex flex-col items-center gap-5">
        <Products />
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
        <button data-testid="finish-recipe-btn">finish</button>
      </div>
    </div>
  );
}

export default RecipesInProgress;
