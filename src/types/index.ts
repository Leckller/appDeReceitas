import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type Common = {
  dateModified: string | null;
  strCategory: string;
  strCreativeCommonsConfirmed: string | null;
  strImageSource: string | null;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strTags: string;
};

export type Drinks = Common & {
  idDrink: string;
  strAlcoholic: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strDrinkThumb: string;
  strGlass: string;
  strIBA: string | null;
  strImageAttribution: string | null;
  strInstructions: string;
  strInstructionsDE: string;
  strInstructionsES: string;
  strInstructionsFR: string | null;
  strInstructionsIT: string;
  strInstructionsZH_HANS: string | null;
  strInstructionsZH_HANT: string | null;
  strVideo: string | null;
  [key: string]: string | null,
};

export type Meals = Common & {
  idMeal: string;
  strArea: string;
  strDrinkAlternate: string | null;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strYoutube: string;
  [key: string]: string | null,
};

export type Favorite = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string,
};

export type Categorias = {
  strCategory: string,
};

export type GlobalState = {
  recipes: TypeRecipes[],
  filters: TypeRecipes[],
  loading: boolean,
};

export type FiltersDrinks = {
  'strDrink': string,
  'strDrinkThumb': string,
  'idDrink': string,
};

export type FiltersMeals = {
  'strMeal': string,
  'strMealThumb': string,
  'idMeal': string,
};

export type Categories = {
  strCategory: string,
};

export type Progress = Record<'meals' | 'drinks', { [key: string]: string[] }>;

export type TypeRecipes = Meals | Drinks;

export type Key = {
  key: 'firstLetter' | 'ingredient' | 'name' | 'list' | 'categories' | '' | 'id' | string,
};
export type Form = Key & {
  search?: string | '',
};

export type Unions = Favorite[] | Progress | TypeRecipes[];

export type Path = 'Meal' | 'Drink' | '';

export type Dispatch = ThunkDispatch<GlobalState, void, AnyAction>;
