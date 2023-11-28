import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Layout from './components/Header/Layout';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/" Component={ Layout }>
        <Route path="meals" Component={ Recipes } />
        <Route path="drinks" Component={ Recipes } />
        <Route path="meals:id-da-receita" Component={ Details } />
        <Route path="drinks:id-da-receita" Component={ Details } />
        <Route path="profile" Component={ Profile } />
        <Route path="done-recipes" Component={ DoneRecipes } />
        <Route path="favorite-recipes" Component={ FavoriteRecipes } />
      </Route>
    </Routes>
  );
}

export default App;
