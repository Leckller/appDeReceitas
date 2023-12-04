import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';

function Section() {
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const loading = useSelector((state: GlobalState) => state.loading);

  const animate = loading ? '' : 'animate-afterLoad';

  return (
    <div>
      <section
        className="flex w-screen flex-row flex-wrap
      items-center gap-2 justify-center mt-10"
      >
        {
          // faz a reendenização das 12 primeiras Recipes
          filters.slice(0, 12).map((filter, index) => (
            <Link
              to={ `${pathname}/${filter[`id${route(pathname)}`]}` }
              key={ index }
            >
              <article
                className={ `${animate} w-48 h-48 flex items-center flex-col
                justify-around hover:scale-110 transition-all mb-10` }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="w-full shadow-2xl shadow-blue-950 rounded-t-md"
                  src={ `${filter[`str${route(pathname)}Thumb`]}` }
                  alt={ `${filter[`str${route(pathname)}`]}` }
                  data-testid={ `${index}-card-img` }
                />
                <h1
                  className="z-50 p-2 bg-white w-full text-center rounded-b-md"
                  data-testid={ `${index}-card-name` }
                >
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
