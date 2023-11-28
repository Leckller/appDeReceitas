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
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('Check if you click on drinks and redirected to profile', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks');

    const profileBtn = screen.getByTestId(profileBtnID);
    const searchBtn = screen.getByTestId(searchBtnID);

    let title = screen.getByTestId(titleID);

    expect(title).toHaveTextContent('Drinks');

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(serchInputID);
    const ingredientRadio = screen.getByTestId(ingredientRadioID);
    const enterBtn = screen.getByTestId(enterBtnID);

    await user.type(searchInput, 'banana');
    await user.click(ingredientRadio);

    await user.click(enterBtn);

    await user.click(searchBtn);

    await user.click(profileBtn);

    title = screen.getByTestId(titleID);
    expect(title).toHaveTextContent('Profile');
  });
});
