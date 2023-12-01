import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';

function Products() {
  const { pathname } = useLocation();

  const filters = useSelector((state: GlobalState) => state.filters);

  const product = filters[0] || {};

  const recipesProduts = Object.entries(product)
    .filter(([key, value]) => key.includes('strIngredient') && value);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ product[`str${route(pathname)}Thumb`] as string }
        alt={ product[`str${route(pathname)}`] as string }
      />
      <h1
        data-testid="recipe-title"
      >
        { product[`str${route(pathname)}`] }
      </h1>
      <p
        data-testid="recipe-category"
      >
        {`${product.strCategory}: ${product[pathname
          .includes('meals') ? 'strTags' : 'strAlcoholic']}`}
      </p>
      <p data-testid="instructions">{ product.strInstructions }</p>
      {
                recipesProduts.map((value, index) => (
                  <div key={ index }>
                    <p
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${value[1]}: ${product[`strMeasure${index + 1}`]}`}
                    </p>
                  </div>
                ))
              }
      {
                product.strYoutube && (
                  <iframe
                    src={ product.strYoutube?.replace('watch?v=', 'embed/') as string }
                    allowFullScreen
                    title={ product[`str${route(pathname)}`] as string }
                    data-testid="video"
                  />
                )
              }
    </div>
  );
}

export default Products;
