import { LSProgressType } from '../types';

/* eslint-disable max-params */
export const useLocalStorage = () => {
  const setItem = (value_: unknown, key_: string) => {
    localStorage.setItem(key_, JSON.stringify(value_));
  };
  const getItem = (key_: string):LSProgressType => {
    const item = localStorage.getItem(key_);
    return item ? JSON.parse(item as string) : undefined;
  };

  // key: chave do localstorage
  // id: id do item
  // filter: para drinks ou meals
  // values: valores atuais dos inputs
  // rItem: item para remover

  const removeItem = (
    key_: string,
    id: string,
    filter: 'drinks' | 'meals',
    values: any[],
    rItem: any,
  ) => {
    const local = getItem(key_);
    const newObj = { ...local,
      [filter]: { ...local[filter]
        .filter((i:string) => i !== id),
      [id]: values.filter((i) => i !== rItem) } };
    // localStorage.setItem()
  };
  return { setItem, getItem, removeItem };
};

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
