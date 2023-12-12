import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Categories, Dispatch, GlobalState } from '../types';
import { setAnyFilterInGlobal, setLoading, setVisibleRecipes } from '../redux/actions';
import Loading from '../components/Loading/Loading';
import { filterAll, route } from '../utils/FuncsAll';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar/SearchBar';

function Recipes() {
  // pathname pega a rota em que você estiver
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  const { loading, searchBar } = useSelector((state: GlobalState) => state);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [select, setSelect] = useState('All');

  const renderTitle = (str: string) => {
    if (pathname === '/done-recipes' || pathname === '/favorite-recipes') {
      const replace = str.replace('-recipes', ' Recipes');
      return replace.charAt(1).toUpperCase() + replace.slice(2);
    }
    return str.charAt(1).toUpperCase() + str.slice(2);
  };

  const title = renderTitle(pathname);

  const handleClick = (strCategory: string) => {
    // if (select === 'All' && strCategory === 'All') return;
    dispatch(setVisibleRecipes(12));
    dispatch(setLoading(true));
    if (select === strCategory || strCategory === 'All') {
      setSelect('All');
      dispatch(setAnyFilterInGlobal({ key: 'name' }, route(pathname)));
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
    dispatch(setLoading(true));
    (async () => {
      const data = await filterAll({ key: 'list' }, route(pathname));
      setCategories(data);
    })();
    dispatch(setAnyFilterInGlobal({ key: 'name' }, route(pathname)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (loading) {
    return (<Loading />);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1 pb-20">
      <div className="flex justify-center items-center flex-col gap-5 pt-10">
        {searchBar && <SearchBar />}
        <img
          className="scale-125"
          src={ title === 'Meals' ? mealIcon : drinkIcon }
          alt=""
        />
        <h1
          className="text-purple-800 text-4xl font-bold "
          data-testid="page-title"
        >
          { title }

        </h1>
      </div>
      <section
        className="w-screen flex flex-row flex-wrap items-center
        justify-around mt-10"
      >
        {
          // faz a reendenização das 5 primeiras Categories
        categories.slice(0, 5).map(({ strCategory }) => (
          <button
            className="w-16 h-16 border border-gray-400
            rounded-full truncate"
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
          className="w-16 h-16 border border-gray-400
          rounded-full truncate"
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
