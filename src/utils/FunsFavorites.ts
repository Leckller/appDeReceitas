import { Favorite } from '../types';

export const verifyFavorite = (items: Favorite[], id: string) => items
  .some((item) => item.id === id);

export const removeFavorite = (items: Favorite[], id: string) => items
  .filter((item) => item.id !== id);
