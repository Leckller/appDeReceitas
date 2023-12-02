import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Done Recipes', () => {
  test('Checks done recipes functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/done-recipes');

    screen.getByRole('heading', { level: 1, name: 'Dones Recipes' });

    await user.click(screen.getByTestId('profile-top-btn'));

    await screen.findByRole('heading', { level: 1, name: 'Profile' });
  });
});
