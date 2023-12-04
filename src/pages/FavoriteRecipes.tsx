import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TypeRecipes, GlobalState } from '../types';
import { getItem } from '../utils/localStorage'; // Supondo que getItem é o método para obter dados do localStorage

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<TypeRecipes[]>([]);

  // Utilizando useSelector para obter o estado global
  const storedFavoriteRecipes = useSelector(
    (state: GlobalState) => state.favoriteRecipes,
  );

  useEffect(() => {
    // Verifica se há receitas favoritas no localStorage e atualiza o estado
    const localStorageFavorites = getItem('favoriteRecipes') || [];
    setFavoriteRecipes(localStorageFavorites as TypeRecipes[]);
  }, []);

  // Função para manipular a lógica de favoritar/desfavoritar
  const toggleFavorite = (recipeId: string) => {

  };

  return (
    <div className="favorite-recipes-container">
      <h1>Favorite Recipes</h1>
      <div className="favorite-recipes-grid">
        {favoriteRecipes.map((recipe, index) => (
          <div key={ index } className="recipe-card">
            {/* Imagem */}
            <img
              src={ recipe.image || '' } // Substitua por sua lógica de imagem
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
            {/* Botões de Compartilhar e Favoritar */}
            <button
              onClick={ () => {
                // Lógica para compartilhar a receita
              } }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share
            </button>
            <button
              onClick={ () => toggleFavorite(recipe.id || '') }
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              { /* Lógica para exibir coração preenchido ou vazio conforme favorito */}
              {recipe.isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
