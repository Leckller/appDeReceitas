import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem, setItem } from '../utils/localStorage';
import { Favorite, GlobalState } from '../types';
import { route } from '../utils/FuncsAll';
import { removeKey, newRecipes } from '../utils/FunsFavorites';

function useFavorite() {
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const [favorites, setFavorites] = useState<Favorite[]>(
    getItem<Favorite[]>('favoriteRecipes'),
  );

  const verifyFavorite = (id: string | undefined) => favorites.some((item) => (item
    ? item.id === id : false));

  const newFavorites = () => {
    const recipe = [...newRecipes(route(pathname), filters)];
    recipe.forEach((item) => delete item.doneDate && delete item.tags);
    return [...favorites, recipe[0]] as Favorite[];
  };

  const changeFavorite = (id: string | undefined) => {
    if (verifyFavorite(id)) {
      const removeFavorite = removeKey(favorites, id);
      setFavorites(removeFavorite);
      setItem('favoriteRecipes', removeFavorite);
    } else {
      setFavorites(newFavorites());
      setItem('favoriteRecipes', newFavorites());
    }
  };

  return { changeFavorite, verifyFavorite, favorites, setFavorites };
}

export default useFavorite;
