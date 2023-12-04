import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TypeRecipes, GlobalState } from '../types';
import { getItem } from '../utils/localStorage';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<TypeRecipes[]>([]);

  // utilizando useSelector para obter o estado global
  const storedFavoriteRecipes = useSelector(
    (state: GlobalState) => state.favoriteRecipes,
  );

  useEffect(() => {
    // verifica se há receitas favoritas no localStorage e atualiza o estado
    const localStorageFavorites = getItem('favoriteRecipes') || [];
    setFavoriteRecipes(localStorageFavorites as TypeRecipes[]);
  }, []);

  const toggleFavorite = (recipeId: string) => {

  };

  return (
    <div className="favorite-recipes-container">
      <h1>Favorite Recipes</h1>
      <div className="favorite-recipes-grid">
        {favoriteRecipes.map((recipe, index) => (
          <div key={ index } className="recipe-card">
            {/* imagem */}
            <img
              src={ recipe.image || '' }
              alt={ recipe.name || '' }
              data-testid={ `${index}-horizontal-image` }
            />
            {/* Tipo (Meals/Drinks) e Nome */}
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type}
              :
              {' '}
              {recipe.name}
            </p>
            {/* botões de Compartilhar e Favoritar */}
            <button
              onClick={ () => {
                // logica para compartilhar
              } }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share
            </button>
            <button
              onClick={ () => toggleFavorite(recipe.id || '') }
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              { /* lógica para exibir coração preenchido ou vazio */}
              {recipe.isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
