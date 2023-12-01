import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { LSProgressType } from '../types';

export const getItem = (key_: string):LSProgressType => {
  const item = localStorage.getItem(key_);
  return item ? JSON.parse(item as string) : undefined;
};

export const useProgress = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const actRecipe: 'drinks' | 'meals' = pathname.split('/')[1] as 'drinks' | 'meals';
  const chave = 'inProgressRecipes';
  const [actvInputs, setActvInputs] = useState<LSProgressType>(getItem(chave));

  const setItem = (value_: unknown, key_: string) => {
    localStorage.setItem(key_, JSON.stringify(value_));
  };

  // key: chave do localstorage
  // id: id do item
  // filter: para drinks ou meals
  // values: valores atuais dos inputs
  // rItem: item para remover

  const editItem = (item: string) => {
    const local = getItem(chave);
    const key = actvInputs[actRecipe];
    if (key[id as string].some((i) => i === item)) {
      const newObj = { ...local,
        [actRecipe]: { ...local[actRecipe],
          [id as string]: {
            ...key,
            [id as string]: [...key[id as string]
              .filter((i) => i !== item)],
          } } };
      setItem(newObj, chave);
    } else {
      const newObj = { ...local,
        [actRecipe]: { ...local[actRecipe],
          [id as string]: {
            ...key,
            [id as string]: [...key[id as string], item],
          } } };
      setItem(newObj, chave);
    }
  };
  return { setItem, getItem, editItem };
};

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
