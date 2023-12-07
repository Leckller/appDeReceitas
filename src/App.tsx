import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Layout from './components/Header/Layout';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/" Component={ Layout }>
        <Route path="/meals" Component={ Recipes } />
        <Route path="/drinks" Component={ Recipes } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/done-recipes" Component={ DoneRecipes } />
        <Route path="/favorite-recipes" Component={ FavoriteRecipes } />
      </Route>
      <Route path="/meals/:id" Component={ RecipeDetails } />
      <Route path="/drinks/:id" Component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" Component={ RecipesInProgress } />
      <Route path="/drinks/:id/in-progress" Component={ RecipesInProgress } />
    </Routes>
  );
}

export default App;
