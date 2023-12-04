import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import { drinksID } from './mock/drinks_id_17222';
import { mealsID } from './mock/meals_id_52772';

describe('Check page Details', () => {
  test('Checks favorite functionality', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mealsID,
    } as Response);

    const favoriteID = 'favorite-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/meals/52772');

    screen.getByRole('heading', { level: 1, name: 'Details Meals' });

    await screen.findByAltText('White Heart Icon');

    let favoriteBtn = await screen.findByTestId(favoriteID);

    await user.click(favoriteBtn);

    console.log(JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'));

    await screen.findByAltText('Black Heart Icon');

    favoriteBtn = await screen.findByTestId(favoriteID);

    await user.click(favoriteBtn);

    await screen.findByAltText('White Heart Icon');
  });
  test('Checks share functionality', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => drinksID,
    } as Response);
    const shareID = 'share-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/17222');

    screen.getByRole('heading', { level: 1, name: 'Details Drinks' });

    const shareBtn = screen.getByTestId(shareID);

    await user.click(shareBtn);

    await screen.findByRole('heading', { level: 2, name: 'Link copied!' });
  });
});
