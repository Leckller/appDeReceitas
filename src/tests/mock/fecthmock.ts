import { drinksID17222, mealsID53060, belmont15346, sushi53065 } from './apiID';
import drinks from '../../../cypress/mocks/drinks';
import meals from '../../../cypress/mocks/meals';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import mealCategories from '../../../cypress/mocks/mealCategories';
import beefMeals from '../../../cypress/mocks/beefMeals';
import cocktailDrinks from '../../../cypress/mocks/cocktailDrinks';
import { searchDrinksY, searchMealsY } from './searchY';
import { drinksBanana, mealsBanana } from './searchBanana';
import { ACID, Arrabiata, ArrabiataID } from './searchName';

const POSSIBLE_RESPONSE: any = {
  // ingredient
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinks,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': meals,
  // name
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=banana': mealsBanana,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=banana': drinksBanana,
  // firstLetter
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y': searchDrinksY,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=y': searchMealsY,
  // name
  'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata': Arrabiata,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ACID': ACID,
  // list
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealCategories,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': drinkCategories,
  // categories
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': cocktailDrinks,

  // id
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': ArrabiataID,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060': mealsID53060,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222': drinksID17222,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53065': sushi53065,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15346': belmont15346,
};

const fecthMock = (url: string) => Promise.resolve({
  ok: true,
  status: 200,
  json: async () => Promise.resolve(POSSIBLE_RESPONSE[url]),
});

export default fecthMock;
