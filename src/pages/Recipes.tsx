import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Categories, Dispatch, GlobalState } from '../types';
import { setAnyFilterInGlobal, setLoading } from '../redux/actions';
import Loading from '../components/Loading/Loading';
import { filterAll, route } from '../utils/FuncsAll';
import Section from '../components/Recipes';

function Recipes() {
  // pathname pega a rota em que você estiver
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  const loading = useSelector((state: GlobalState) => state.loading);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [select, setSelect] = useState('All');

  const handleClick = (strCategory: string) => {
    if (select === 'All' && strCategory === 'All') return;
    dispatch(setLoading(true));
    if (select === strCategory || strCategory === 'All') {
      setSelect('All');
      dispatch(setAnyFilterInGlobal({ key: 'name' }, route(pathname)));
      dispatch(setLoading(false));
    } else {
      setSelect(strCategory);
      dispatch(setAnyFilterInGlobal(
        { key: 'categories' },
        route(pathname),
        strCategory,
      ));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    (async () => {
      const data = await filterAll({ key: 'list' }, route(pathname));
      setCategories(data);
    })();
    dispatch(setLoading(true));
    dispatch(setAnyFilterInGlobal({ key: 'name' }, route(pathname)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1 pb-20">
      <section
        className="w-screen flex flex-row flex-wrap items-center
        justify-around"
      >
        {
        // faz a reendenização das 5 primeiras Categories
        categories.slice(0, 5).map(({ strCategory }) => (
          <button
            className="mt-4 hover:scale-110 transition-all border border-blue-950
            rounded-md w-28"
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
          className="mt-4 hover:scale-110 transition-all border border-blue-950
          rounded-md w-28"
          data-testid="All-category-filter"
          value="All"
          onClick={ () => handleClick('All') }
        >
          All
        </button>
      </section>
      <Section />
    </div>
  );
}

export default Recipes;
