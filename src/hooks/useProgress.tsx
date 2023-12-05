import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { path, route } from '../utils/FuncsAll';
import { getItem, setItem } from '../utils/localStorage';
import { Favorite, GlobalState, Progress } from '../types';
import { newRecipes } from '../utils/FunsFavorites';

export const useProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const filters = useSelector((state: GlobalState) => state.filters);
  const storage = getItem('inProgressRecipes') as Progress || {};
  const [progress, setProgress] = useState<Progress>(storage);
  const [dones, setDones] = useState<Favorite[]>(
    getItem('doneRecipes') as Favorite[] || [],
  );

  const newProgress = () => {
    return Object.entries(storage[path(pathname)] as Progress)
      .filter(([key]) => key !== id).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value };
      }, {});
  };

  const newRecipe = (checked: string[]) => ({ ...storage,
    [path(pathname)]: { ...storage[path(pathname)],
      [id as string]: [...checked],
    },
  });

  const saveProgress = (checked: string[]) => {
    setProgress(newRecipe(checked));
    setItem('inProgressRecipes', newRecipe(checked));
    return progress[path(pathname)];
  };

  const changeDoneRecipes = () => {
    const verifyDones = dones.some((item) => item.id === id);
    const newDones = () => {
      const formaterDones = newRecipes(route(pathname), filters)[0];
      return [...dones, formaterDones] as Favorite[];
    };

    if (!verifyDones && progress) {
      const conditionalStorage = storage[path(pathname)]?.[id as string]
        ? newProgress() : localStorage.removeItem('inProgressRecipes');

      setProgress(newProgress());
      setItem('inProgressRecipes', conditionalStorage);
      setDones(newDones());
      setItem('doneRecipes', newDones());
    }
  };
  return { saveProgress, changeDoneRecipes };
};
