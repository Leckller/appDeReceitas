import { Form, Path } from '../types';

const path = {
  meals: 'meal',
  drinks: 'cocktail',
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
  try {
    const response = await fetch(`https://www.the${path[pathFilter]}db.com/api/json/v1/1/${radioFilter[radio]}=${search}`);
    const data = await response.json();

    return data[pathFilter];
  } catch (error) {
    if (radio === 'firstLetter' && search.length > 1) {
      throw new Error('Your search must have only 1 (one) character');
    }
    throw new Error(`Search by ${radio} didn't return data`);
  }
};
