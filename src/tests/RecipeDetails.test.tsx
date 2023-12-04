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

describe('Check page Details', () => {
  test('Checks favorite functionality', async () => {
    const favoriteID = 'favorite-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/meals/53060');

    screen.getByRole('heading', { level: 1, name: 'Details Meals' });

    await screen.findByAltText('White Heart Icon');

    let favoriteBtn = await screen.findByTestId(favoriteID);

    await user.click(favoriteBtn);

    await screen.findByAltText('Black Heart Icon');

    favoriteBtn = await screen.findByTestId(favoriteID);

    await user.click(favoriteBtn);

    await screen.findByAltText('White Heart Icon');
  });
  test('Checks share functionality', async () => {
    const shareID = 'share-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/17222');

    screen.getByRole('heading', { level: 1, name: 'Details Drinks' });

    const shareBtn = screen.getByTestId(shareID);

    await user.click(shareBtn);

    await screen.findByRole('heading', { level: 2, name: 'Link copied!' });
  });
});
