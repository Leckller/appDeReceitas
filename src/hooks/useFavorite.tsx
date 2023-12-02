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

  const newFavoriteRecipes = (paths: string) => {
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
    })) as Favorite[];
  };

  const verifyFavorite = () => favorites.some((item) => item.id === id);

  const removeFavorite = () => favorites.filter((item) => item.id !== id);

  const newFavorites = () => {
    const recipe = [...newFavoriteRecipes(route(pathname))];
    recipe.forEach((item) => delete item.doneDate && delete item.tags);
    return [...favorites, recipe[0]] as Favorite[];
  };

  const changeFavorite = () => {
    if (verifyFavorite()) {
      setFavorites(removeFavorite());
      setItem('favoriteRecipes', removeFavorite());
    } else {
      setFavorites(newFavorites());
      setItem('favoriteRecipes', newFavorites());
    }
  };

  const verifyFinishRecipe = () => finish.some((item) => item.id === id);

  const removeFinishRecipe = () => finish.filter((item) => item.id !== id);

  const newDones = () => {
    const formaterDones = newFavoriteRecipes(route(pathname))[0];
    return [...finish, formaterDones] as Favorite[];
  };

  const changeDoneRecipes = () => {
    if (verifyFinishRecipe()) {
      setFavorites(removeFinishRecipe());
      setItem('finishRecipes', removeFinishRecipe());
    } else {
      setFinish(newDones());
      setItem('doneRecipes', newDones());
    }
  };

  return { changeFavorite, verifyFavorite, changeDoneRecipes };
}

export default useFavorite;
