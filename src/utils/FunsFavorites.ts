import { Favorite } from '../types';

export const useFavorites = () => {
  const verifyFavorite = (items: Favorite[], id: string) => items
    .some((item) => item.id === id);
  const removeFavorite = (items: Favorite[], id: string) => items
    .filter((item) => item.id !== id);

  return { verifyFavorite, removeFavorite };
};
