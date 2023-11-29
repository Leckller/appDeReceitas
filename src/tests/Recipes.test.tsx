import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Recipes', () => {
  const titleID = 'page-title';
  const profileBtnID = 'profile-top-btn';
  const searchBtnID = 'search-top-btn';
  const serchInputID = 'search-input';
  const ingredientRadioID = 'ingredient-search-radio';
  const nameRadioID = 'name-search-radio';
  const enterBtnID = 'exec-search-btn';
  test('Checks alert functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    window.alert = vi.fn(() => {});

    const searchBtn = screen.getByTestId(searchBtnID);
    await user.click(searchBtn);

    const searchInput = screen.getByTestId(serchInputID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const enterBtn = screen.getByTestId(enterBtnID);

    await user.type(searchInput, 'asdas');
    await user.click(nameRadio);

    await user.click(enterBtn);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters');
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  test.only('Check if you click on drinks', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks');

    const searchBtn = screen.getByTestId(searchBtnID);

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(serchInputID);
    const ingredientRadio = screen.getByTestId(ingredientRadioID);
    const enterBtn = screen.getByTestId(enterBtnID);
    let article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);

    await user.type(searchInput, 'banana');
    await user.click(ingredientRadio);

    await user.click(enterBtn);

    article = await screen.findAllByRole('article');

    expect(article).toHaveLength(6);
  });
  test('Check if you redirected to page profile', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks');

    const profileBtn = screen.getByTestId(profileBtnID);
    const title = screen.getByTestId(titleID);

    await user.click(profileBtn);

    expect(title).toHaveTextContent('Profile');
  });
});
