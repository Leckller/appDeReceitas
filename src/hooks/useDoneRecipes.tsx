import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItem, setItem } from '../utils/localStorage';
import { Favorite, GlobalState } from '../types';
import { route } from '../utils/FuncsAll';

function useDoneRecipes() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const [favorites, setFavorites] = useState<Favorite[]>(
    getItem('FinishRecipes') as Favorite[] || [],
  );
  const verifyFinishRecipe = () => favorites
    .some((item) => item.id === id);

  const removeFinishRecipe = () => favorites
    .filter((item) => item.id !== id);

  const setFinishRecipes = (paths: string) => {
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

  //   [{
  //     id: id-da-receita,
  //     type: meal-ou-drink,
  //     nationality: nacionalidade-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  const changeFinish = () => {
    if (verifyFinishRecipe()) {
      setFavorites(removeFinishRecipe());
      setItem('FinishRecipes', removeFinishRecipe());
    } else {
      const formaterFavorite = setFinishRecipes(route(pathname))[0];
      const newFavorites = [
        ...favorites,
        formaterFavorite,
      ];
      setFavorites(newFavorites);
      setItem('doneRecipes', newFavorites);
    }
  };
  return { changeFinish, verifyFinishRecipe };
}

export default useDoneRecipes;
