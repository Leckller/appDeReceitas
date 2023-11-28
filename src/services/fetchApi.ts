import { Form, Path } from '../types';

const path = {
  Meal: 'meal',
  Drink: 'cocktail',
};

const radioFilter = {
  ingredient: 'filter.php?i',
  name: 'search.php?s',
  firstLetter: 'search.php?f',
};

export const fecthApi = async (
  { search, radio }: Form,
  pathFilter: Path,
) => {

  const pathLower = `${pathFilter.toLowerCase()}s`;

  if (radio === 'firstLetter' && search.length > 1) {
    throw new Error('Your search must have only 1 (one) character');
  }

  const response = await fetch(`https://www.the${path[pathFilter]}db.com/api/json/v1/1/${radioFilter[radio]}=${search}`);
  const data = await response.json();

  if (!data[pathLower]) {
    throw new Error("Sorry, we haven't found any recipes for these filters");
  }

  return data[pathLower];
};
