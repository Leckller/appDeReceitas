import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GlobalState, LSProgressType } from '../types';

const getItem = (key_: string):LSProgressType => {
  const item = localStorage.getItem(key_);
  return item ? JSON.parse(item as string) : undefined;
};

export const useProgress = () => {
  const { id } = useParams();
  const filters = useSelector((state: GlobalState) => state.filters);
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
  const removeItem = () => {
    const local = getItem(chave);
    const newObj = { ...local,
      [actRecipe]: { ...local[actRecipe],
        [id as string]: actvInputs[actRecipe][id as string] } };
    // localStorage.setItem()
  };
  return { setItem, getItem, removeItem };
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
