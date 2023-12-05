import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import fecthMock from './mock/fecthmock';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Check page Done Recipes', () => {
  test('Checks done recipes functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/done-recipes');

    screen.getByRole('heading', { level: 1, name: 'Done Recipes' });

    await user.click(screen.getByTestId('profile-top-btn'));

    await screen.findByRole('heading', { level: 1, name: 'Profile' });
  });
});
