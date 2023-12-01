import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { path } from '../utils/FuncsAll';
import { getItem, setItem } from '../utils/localStorage';
import { Progress } from '../types';

export const useProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const key = 'inProgressRecipes';
  const storage = (getItem(key) as Progress);
  const [progress, setProgress] = useState<Progress>(storage);

  const saveProgress = (checked: string[]) => {
    const newRecipe = { ...storage,
      [path(pathname)]: { ...storage[path(pathname)],
        [id as string]: [...checked],
      },
    };
    setProgress(newRecipe);
    setItem(key, newRecipe);
    return progress[path(pathname)];
  };
  return { saveProgress };
};
