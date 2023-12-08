import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import fecthMock from './mock/fecthmock';
import { mockFavorite } from './mock/favorite';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Check page Done Recipes', () => {
  const route = '/done-recipes';
  const belmontDrink = '155 Belmont';
  const recipeCard = 'recipe-card';
  const linkCard = 'image-link';
  test('Checks buttons filters functionality', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    let linkDone = await screen.findAllByTestId(recipeCard);

    expect(linkDone).toHaveLength(4);

    await user.click(drinksBtn);

    linkDone = await screen.findAllByTestId(recipeCard);

    expect(linkDone).toHaveLength(2);
    expect(linkDone[0]).toHaveTextContent(belmontDrink);
    expect(linkDone[1]).toHaveTextContent('GG');

    await user.click(mealsBtn);

    linkDone = await screen.findAllByTestId(recipeCard);

    expect(linkDone).toHaveLength(2);
    expect(linkDone[0]).toHaveTextContent('Sushi');
    expect(linkDone[1]).toHaveTextContent('Corba');

    await user.click(allBtn);

    linkDone = await screen.findAllByTestId(recipeCard);

    expect(linkDone).toHaveLength(4);
    expect(linkDone[0]).toHaveTextContent('Sushi');
  });
  test('Checks buttons functionality', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const shareFavorite = await screen.findAllByAltText('shareIcon');
    let linkDone = await screen.findAllByTestId(linkCard);

    expect(linkDone).toHaveLength(4);

    await user.click(shareFavorite[0]);

    await screen.findByRole('heading', { level: 2, name: 'Link copied!' });

    linkDone = await screen.findAllByTestId(linkCard);

    await user.click(linkDone[1]);

    await screen.findByRole('heading', { level: 1, name: belmontDrink });
  });
  test('Checks link meals functionality', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockFavorite));
    // vi.spyOn(window, 'alert').mockImplementation(() => 'Link copied!');

    const { user } = renderWithRouterAndRedux(<App />, route);

    const linkDone = await screen.findAllByTestId(linkCard);

    await user.click(linkDone[0]);

    await screen.findByRole('heading', { level: 1, name: 'Sushi' });
  });
});
