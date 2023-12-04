import { Favorite, TypeRecipes } from '../types';

export const removeFavorite = (items: Favorite[], id: string) => items
  .filter((item) => item.id !== id);

export const removeKey = (state: Favorite[], id: string) => state
  .filter((item) => item.id !== id);

export const newRecipes = (paths: string, filters: TypeRecipes[]) => {
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
