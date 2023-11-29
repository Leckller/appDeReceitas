import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Categories, Dispatch, Form, GlobalState } from '../types';
import { fecthApi } from '../services/fetchApi';
import { setAnyFilterInGlobal, setLoading } from '../redux/actions';
import Loading from '../components/Loading/Loading';

function Recipes() {
  // pathname pega a rota em que você estiver
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  const { filters, loading } = useSelector((state: GlobalState) => state);
  const [categories, setCategories] = useState<Categories[]>([]);

  const [select, setSelect] = useState('All');

  // verifica a rota que está e faz a condicional de forma dinâmica Drinks ou Meals.
  const recipePath = pathname.includes('/meals') ? 'Meal' : 'Drink';

  // faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
  const filterAll = async (form: Form, filter: string = '') => {
    const { search = '', key } = form;
    const data = await fecthApi({ key, search }, recipePath, filter);
    return data;
  };
  const handleClick = (strCategory: string) => {
    if (select === strCategory) {
      setSelect('All');
      dispatch(setAnyFilterInGlobal({ key: 'name' }, recipePath));
    } else {
      setSelect(strCategory);
      return dispatch(setAnyFilterInGlobal(
        { key: 'categories' },
        recipePath,
        strCategory,
      ));
    }
  };

  useEffect(() => {
    (async () => {
      const data = await filterAll({ key: 'list' });
      setCategories(data);
    })();
    dispatch(setLoading(true));
    dispatch(setAnyFilterInGlobal({ key: 'name' }, recipePath));
  }, [recipePath]);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div>
      {
        // faz a reendenização das 5 primeiras Categories
        categories.slice(0, 5).map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ () => handleClick(strCategory) }
          >
            { strCategory }
          </button>
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => dispatch(setAnyFilterInGlobal({ key: 'name' }, recipePath)) }
      >
        All
      </button>
      <section className="flex w-screen flex-wrap gap-4 p-2">
        {
          // faz a reendenização das 12 primeiras Recipes
          filters.slice(0, 12).map((filter, index) => (
            <Link
              to={ `/${recipePath.toLowerCase()}s/${filter[`id${recipePath}`]}` }
              key={ index }
            >
              <article
                className="w-64 h-64 flex items-center flex-col
            justify-around
          bg-red-400"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="w-1/2"
                  src={ `${filter[`str${recipePath}Thumb`]}` }
                  alt={ `${filter[`str${recipePath}`]}` }
                  data-testid={ `${index}-card-img` }
                />
                <h1 data-testid={ `${index}-card-name` }>
                  {filter[`str${recipePath}`]}
                </h1>
              </article>
            </Link>
          ))
        }
      </section>
    </div>
  );
}

export default Recipes;
