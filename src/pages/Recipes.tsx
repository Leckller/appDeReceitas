import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Drink from '../components/Recipes/Drink';
import Meal from '../components/Recipes/Meal';
import { Categorias, Drinks, Meals } from '../types';
import Categories from '../components/Recipes/Categories';
import { dataCat, dataItem, setItemsByCategory } from '../services/RecipesFunctions';

function Recipes() {
  const { pathname } = useLocation();
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [titleCategorie, setTitleCategorie] = useState('');
  const title = pathname.slice(1);
  const [Items, setItems] = useState<Meals[] | Drinks[]>([]);
  useEffect(() => {
    const effect = async () => {
      // Fetch categorias de Drink ou Meal
      setCategorias(await dataCat(title));

      // Fetch item - drink ou meal
      setItems(await dataItem(title));
    };
    if (Items.length === 0) effect();
  }, [title, Items]);

  const handleClick = async (cat: string) => {
    setItems(await setItemsByCategory(title, cat));
    setTitleCategorie(cat);
    if (cat === titleCategorie) {
      setItems(await dataItem(title));
      setTitleCategorie('');
    }
  };
  const handleClearAll = async () => {
    setItems(await dataItem(title));
  };
  return (
    <div className="bg-blue-200 h-screen overflow-y-auto">
      <Categories
        handleClearAll={ handleClearAll }
        handleClick={ handleClick }
        categorias={ categorias }
      />
      {pathname === '/meals' ? (
        <Meal meals={ Items as Meals[] } />
      ) : (
        <Drink drinks={ Items as Drinks[] } />
      )}
    </div>
  );
}

export default Recipes;
