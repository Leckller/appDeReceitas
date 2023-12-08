import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyFilterInGlobal } from '../redux/actions';
import { path, route } from '../utils/FuncsAll';
import { Dispatch, GlobalState, Progress, TypeRecipes } from '../types';
import { useProgress } from '../hooks/useProgress';
import Products from '../components/Products';
import { getItem } from '../utils/localStorage';

function RecipesInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { saveProgress, changeDoneRecipes } = useProgress();
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
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
    const inProgressRecipes = getItem<Progress>('inProgressRecipes') || {};
    return inProgressRecipes[path(pathname)]?.[id as string] as string[];
  };

  const getCheckeds = () => {
    return isInProgress().filter((checked) => productCheck
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
      <div className="-translate-y-52 bg-white w-screen">
        <div className="p-8">
          <div className="p-2 border-2 rounded-lg border-gray-400">
            {
            recipesProduts.map((value, index) => (
              <div
                key={ index }
              >
                <label
                  htmlFor={ value[1] as string + index }
                  data-testid={ `${index}-ingredient-step` }
                  className={
                        `${productCheck.some((item) => item.includes(`item-${index}`))
                          ? 'text-decoration: line-through solid rgb(0, 0, 0)' : ''}
                          flex flex-row gap-5 w-full`
                    }
                >
                  <input
                    checked={ productCheck
                      .some((item) => item.includes(`item-${index}`)) }
                    onChange={ () => changeChecked(value[1] as string, index) }
                    type="checkbox"
                    name={ value[1] as string }
                    id={ value[1] as string + index }
                  />
                  <p
                    className="w-full"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                  </p>
                </label>
              </div>
            ))
        }
          </div>
        </div>
        <div className="p-10">
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
        <div className="flex flex-col p-10 w-screen items-start">
          <h2>Video</h2>
          {
                product.strYoutube && (
                  <iframe
                    className="w-full h-72"
                    src={ product.strYoutube?.replace('watch?v=', 'embed/') as string }
                    allowFullScreen
                    title={ product[`str${route(pathname)}`] as string }
                    data-testid="video"
                  />
                )
}
        </div>
        <div className="w-screen flex items-center justify-center">
          <button
            data-testid="finish-recipe-btn"
            className="w-32 mb-4 transition ease-in-out
          delay-150 border-2 border-gray-700 hover:-translate-y-1
          hover:scale-110 duration-300 p-1 rounded-md
          shadow-lg disabled:bg-red-400
          "
            disabled={ recipesProduts.length !== productCheck.length }
            onClick={ () => {
              changeDoneRecipes();
              navigate('/done-recipes');
            } }
          >
            finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipesInProgress;
