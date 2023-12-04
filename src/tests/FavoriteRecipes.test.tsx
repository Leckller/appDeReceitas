import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Favorite Recipes', () => {
  test('Checks favorite recipes functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/favorite-recipes');

    screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' });

    await user.click(screen.getByTestId('profile-top-btn'));

    await screen.findByRole('heading', { level: 1, name: 'Profile' });
  });
});
