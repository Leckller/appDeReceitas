import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem, setItem } from '../utils/localStorage';
import { Favorite, GlobalState } from '../types';
import { route } from '../utils/FuncsAll';

function useFavorite() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const [favorites, setFavorites] = useState<Favorite[]>(
    getItem('favoriteRecipes') as Favorite[] || [],
  );

  const verifyFavorite = () => favorites
    .some((item) => item.id === id);

  const removeFavorite = () => favorites
    .filter((item) => item.id !== id);

  const setFavoriteRecipes = (paths: string) => {
    return filters.map((filter) => ({
      id: filter[`id${paths}`],
      type: paths.toLowerCase(),
      nationality: filter.strArea || '',
      category: filter.strCategory || '',
      alcoholicOrNot: filter.strAlcoholic || '',
      name: filter[`str${paths}`],
      image: filter[`str${paths}Thumb`],
    })) as Favorite[];
  };

  const changeFavorite = () => {
    if (verifyFavorite()) {
      setFavorites(removeFavorite());
      setItem('favoriteRecipes', removeFavorite());
    } else {
      const formaterFavorite = setFavoriteRecipes(route(pathname))[0];
      const newFavorites = [
        ...favorites,
        formaterFavorite,
      ];
      setFavorites(newFavorites);
      setItem('favoriteRecipes', newFavorites);
    }
  };
  return { changeFavorite, verifyFavorite };
}

export default useFavorite;
