import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Profile', () => {
  const profileBtnID = 'profile-top-btn';
  test('Checks button favorite functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    await user.click(favoriteRecipesBtn);

    screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' });

    const profileBtn = screen.getByTestId(profileBtnID);

    await user.click(profileBtn);

    screen.getByRole('heading', { level: 1, name: 'Profile' });
  });
  test('Checks button dones recipes functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    await user.click(doneRecipesBtn);

    screen.getByRole('heading', { level: 1, name: 'Done Recipes' });

    const profileBtn = screen.getByTestId(profileBtnID);

    await user.click(profileBtn);

    screen.getByRole('heading', { level: 1, name: 'Profile' });
  });
  test('Checks button logout functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    await user.click(logoutBtn);

    screen.getByRole('heading', { level: 1, name: 'Recipes App' });

    expect(window.localStorage).toHaveLength(0);
  });
});
