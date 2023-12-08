import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import { mockFavorite } from './mock/favorite';
import fecthMock from './mock/fecthmock';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Check page Favorite Recipes', () => {
  const route = '/favorite-recipes';
  const belmontDrink = '155 Belmont';
  test('Checks buttons filters functionality', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    let linkFavorite = await screen.findAllByRole('link');

    expect(linkFavorite).toHaveLength(4);

    await user.click(drinksBtn);

    linkFavorite = await screen.findAllByRole('link');

    expect(linkFavorite).toHaveLength(2);
    expect(linkFavorite[0]).toHaveTextContent(belmontDrink);
    expect(linkFavorite[1]).toHaveTextContent('GG');

    await user.click(mealsBtn);

    linkFavorite = await screen.findAllByRole('link');

    expect(linkFavorite).toHaveLength(2);
    expect(linkFavorite[0]).toHaveTextContent('Sushi');
    expect(linkFavorite[1]).toHaveTextContent('Corba');

    await user.click(allBtn);

    linkFavorite = await screen.findAllByRole('link');

    expect(linkFavorite).toHaveLength(4);
    expect(linkFavorite[0]).toHaveTextContent('Sushi');
  });
  test('Checks buttons functionality', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const removeFavorite = await screen.findAllByAltText('Black Heart Icon');
    const shareFavorite = await screen.findAllByAltText('shareIcon');
    let linkFavorite = await screen.findAllByRole('link');

    expect(linkFavorite).toHaveLength(4);

    await user.click(shareFavorite[0]);

    await screen.findByRole('heading', { level: 2, name: 'Link copied!' });

    await user.click(removeFavorite[0]);

    await waitFor(() => {
      linkFavorite = screen.queryAllByRole('link');

      expect(linkFavorite[0]).not.toHaveTextContent('Sushi');
      expect(linkFavorite[0]).toHaveTextContent(belmontDrink);
    });

    linkFavorite = await screen.findAllByRole('link');

    await user.click(linkFavorite[0]);

    await screen.findByRole('heading', { level: 1, name: belmontDrink });
  });
  test('Checks link meals functionality', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const linkFavorite = await screen.findAllByRole('link');

    await user.click(linkFavorite[0]);

    await screen.findByRole('heading', { level: 1, name: 'Sushi' });
  });
});
