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
  const [finish, setFinish] = useState<Favorite[]>(
    getItem('FinishRecipes') as Favorite[] || [],
  );

  const verifyFinishRecipe = () => finish
    .some((item) => item.id === id);

  const removeFinishRecipe = () => finish
    .filter((item) => item.id !== id);

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
      doneDate: new Date().toJSON(),
      tags: filter.strTags === null ? [] : filter.strTags.split(','),
    }));
  };
  const newFavorites = () => {
    const getFavorite = setFavoriteRecipes(route(pathname))[0] as Favorite[];
    const formaterFavorite = getFavorite.forEach((result) => delete result.doneDate
      && result.tags);
    return [...favorites, formaterFavorite] as Favorite[];
  };

  const newDones = () => {
    const formaterDones = setFavoriteRecipes(route(pathname))[0];
    return [...favorites, formaterDones] as Favorite[];
  };

  const changeFavorite = () => {
    if (verifyFavorite() || verifyFinishRecipe()) {
      setFinish(removeFinishRecipe());
      setItem('favoriteRecipes', removeFavorite());

      setFavorites(removeFavorite());
      setItem('FinishRecipes', removeFinishRecipe());
    } else {
      setFavorites(newFavorites());
      setItem('favoriteRecipes', newFavorites());

      setFinish(newDones());
      setItem('doneRecipes', newDones());
    }
  };
  return { changeFavorite, verifyFavorite };
}

export default useFavorite;
