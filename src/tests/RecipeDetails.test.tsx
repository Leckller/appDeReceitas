import { screen, waitFor } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Details', () => {
  test('Checks favorite functionality', async () => {
    const favoriteID = 'favorite-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/meals/52771');

    screen.getByText(/details meals/i);

    let favoriteBtn = screen.getByTestId(favoriteID);

    await user.click(favoriteBtn);

    await screen.findByAltText('Black Heart Icon');

    favoriteBtn = await screen.getByTestId(favoriteID);

    await user.click(favoriteBtn);

    await screen.findByAltText('White Heart Icon');
  });
  test('Checks share functionality', async () => {
    const shareID = 'share-btn';
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/17222');

    screen.getByText(/details drinks/i);

    const shareBtn = screen.getByTestId(shareID);

    await user.click(shareBtn);

    await screen.findByRole('heading', { level: 2, name: 'Link copied!' });
  });
});
