import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GlobalState, Progress } from '../types';
import { path, route } from '../utils/FuncsAll';
import { getItem, setItem } from '../utils/localStorage';

// ESTRUTURA A SEGUIR

// inProgressRecipes: {
//   drinks: {
//       id-da-bebida: [lista-de-ingredientes-utilizados],
//       ...
//   },
//   meals: {
//       id-da-comida: [lista-de-ingredientes-utilizados],
//       ...
//   }
// }

// key: chave do localstorage
// id: id do item
// filter: para drinks ou meals
// values: valores atuais dos inputs
// rItem: item para remover

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
