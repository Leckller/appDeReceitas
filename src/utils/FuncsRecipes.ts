import { TypeRecipes } from '../types';

export const getIngredient = (product: TypeRecipes) => {
  return Object.entries(product).reduce((
    acc,
    [key, value]: any,
  ) => {
    if (key.includes('strIngredient') && value) {
      const num = key.split('strIngredient')[1];
      return { ...acc, [num]: [value, acc[num]] };
    }
    if (key.includes('strMeasure') && value) {
      const num = key.split('strMeasure')[1];
      return { ...acc, [num]: [acc[num][0], value] };
    }
    return acc;
  }, {} as { [key: string]: [string, string | undefined] });
};
