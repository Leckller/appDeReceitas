import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shareIcon from '../../images/searchIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { route } from '../../utils';
import { TypeRecipes } from '../../types';

function Receita({ product }: { product: TypeRecipes }) {
  const { pathname } = useLocation();

  const [actvItems, setActvItems] = useState<string[]>([]);

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  const handleOnClick = (name:string, index:number) => {
    if (!actvItems.some((item) => item.includes(`item-${index}`))) {
      setActvItems(
        [...actvItems, `item-${index} ${name} ${product[`strMeasure${index + 1}`]}`],
      );
    }
    if (actvItems.some((item) => item.includes(`item-${index}`))) {
      setActvItems([...actvItems.filter((i) => i.split(' ')[0] !== `item-${index}`)]);
    }
  };

  useEffect(() => {
  }, [actvItems]);

  return (
    <div className="">
      <header className="flex w-screen flex-col justify-center relative">
        <input
          type="image"
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
          onClick={ () => {} }
          className="absolute top-3 left-5"
        />
        <input
          className="absolute top-3 right-5"
          type="image"
          src={ blackHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
          onClick={ () => {} }
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
                        `${actvItems.some((item) => item.includes(`item-${index}`))
                          ? 'text-decoration: line-through solid rgb(0, 0, 0)' : ''}`
                    }
                    >
                      <p
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                      </p>
                      <input
                        onClick={ () => handleOnClick(value[1] as string, index) }
                        type="checkbox"
                        name={ value[1] as string }
                        id={ value[1] as string + index }
                      />
                    </label>
                  </div>
                ))
              }
      </div>
    </div>
  );
}

export default Receita;
