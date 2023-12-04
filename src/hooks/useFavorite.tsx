import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem, setItem } from '../utils/localStorage';
import { Favorite, GlobalState } from '../types';
import { route } from '../utils/FuncsAll';
import { removeKey, newRecipes } from '../utils/FunsFavorites';

function useFavorite() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const [favorites, setFavorites] = useState<Favorite[]>(
    getItem('favoriteRecipes') as Favorite[] || [],
  );

  const verifyFavorite = () => favorites.some((item) => item.id === id);

  const changeFavorite = () => {
    const newFavorites = () => {
      const recipe = [...newRecipes(route(pathname), filters)];
      recipe.forEach((item) => delete item.doneDate && delete item.tags);
      return [...favorites, recipe[0]] as Favorite[];
    };
    if (verifyFavorite()) {
      const removeFavorite = removeKey(favorites, id as string);
      setFavorites(removeFavorite);
      setItem('favoriteRecipes', removeFavorite);
    } else {
      setFavorites(newFavorites());
      setItem('favoriteRecipes', newFavorites());
    }
  };

  return { changeFavorite, verifyFavorite };
}

export default useFavorite;
