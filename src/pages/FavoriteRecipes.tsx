import { Favorite } from '../types';
import { getItem } from '../utils/localStorage';
import useFavorite from '../hooks/useFavorite';
import Card from '../components/doneRecipes/Card';

function FavoriteRecipes() {
  const { favorites, setFavorites } = useFavorite();
  const favoriteRecipes = getItem<Favorite[]>('favoriteRecipes');

  const handleClick = (string: string) => {
    setFavorites([...favoriteRecipes.filter((rec) => rec
      .type === string)] as Favorite[]);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center pt-5 gap-5">
      <div className="w-screen flex flex-row justify-center gap-10">

        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavorites(favoriteRecipes) }
        >
          All

        </button>
        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClick('meal') }
        >
          Meals

        </button>
        <button
          className="rounded-full border border-black w-20 h-20"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('drink') }
        >
          Drinks

        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center w-full p-5 gap-5 pb-16">
        {
        favorites.length > 0 && favorites.map((item, index) => {
          return (
            <Card index={ index } recipe={ item } key={ item.id } like />
          );
        })
      }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
