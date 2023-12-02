import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Favorite Recipes', () => {
  test('Checks favorite recipes functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/favorite-recipes');

    await screen.findByRole('heading', { level: 1, name: 'Favorite Recipes' });

    const profileBtnID = screen.getByTestId('profile-top-btn');

    await user.click(profileBtnID);

    await screen.findByRole('heading', { level: 1, name: 'Profile' });
  });
});
