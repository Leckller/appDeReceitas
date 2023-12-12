import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlobalState } from '../../types';
import { route } from '../../utils/FuncsAll';

function Section() {
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const loading = useSelector((state: GlobalState) => state.loading);
  const [visibleRecipes, setVisibleRecipes] = useState(12);
  const animate = loading ? '' : 'animate-afterLoad';

  useEffect(() => {
    const Observer = new IntersectionObserver((entrys) => {
      if (entrys.some((entry) => entry.isIntersecting)) {
        setVisibleRecipes((prev) => prev + 6);
      }
    });
    Observer.observe(document.querySelector('#sentinel') as Element);
  }, [visibleRecipes]);

  return (
    <div>
      <section
        className="flex w-screen flex-row flex-wrap
      items-center gap-6 justify-center mt-10 p-4"
      >
        {
          // faz a reendenização das 12 primeiras Recipes
          filters.slice(0, visibleRecipes).map((filter, index) => (
            <Link
              to={ `${pathname}/${filter[`id${route(pathname)}`]}` }
              key={ index }
            >
              <article
                className={ `${animate} w-44 h-44 flex items-center flex-col
                justify-around hover:scale-110 hover:z-50 transition-all mb-10 grow` }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="w-full shadow-2xl shadow-blue-950 rounded-t-md"
                  src={ `${filter[`str${route(pathname)}Thumb`]}` }
                  alt={ `${filter[`str${route(pathname)}`]}` }
                  data-testid={ `${index}-card-img` }
                />
                <div className="rounded-b-md p-2 text-center bg-white w-full">
                  <p
                    className="w-full truncate"
                    data-testid={ `${index}-card-name` }
                  >
                    {filter[`str${route(pathname)}`]}
                  </p>
                </div>
              </article>
            </Link>
          ))
        }
      </section>
      <div id="sentinel" />
    </div>
  );
}

export default Section;
