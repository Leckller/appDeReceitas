import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';

function Section() {
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  // const animate = loading && 'animate-afterLoad';

  return (
    <div>
      <section className="flex w-screen flex-wrap items-center justify-center">
        {
          // faz a reendenização das 12 primeiras Recipes
          filters.slice(0, 12).map((filter, index) => (
            <Link
              to={ `${pathname}/${filter[`id${route(pathname)}`]}` }
              key={ index }
            >
              <article
                className="animate-afterLoad w-96 h-80
                flex items-center flex-col
                justify-around hover:scale-110 transition-all"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="w-1/2 shadow-2xl shadow-blue-950"
                  src={ `${filter[`str${route(pathname)}Thumb`]}` }
                  alt={ `${filter[`str${route(pathname)}`]}` }
                  data-testid={ `${index}-card-img` }
                />
                <h1 data-testid={ `${index}-card-name` }>
                  {filter[`str${route(pathname)}`]}
                </h1>
              </article>
            </Link>
          ))
        }
      </section>
    </div>
  );
}

export default Section;
