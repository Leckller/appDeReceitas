import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import fecthMock from './mock/fecthmock';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Check page Recipes', () => {
  const profileBtnID = 'profile-top-btn';
  const searchBtnID = 'search-top-btn';
  const serchInputID = 'search-input';

  const firstLetterID = 'first-letter-search-radio';
  const ingredientInputID = 'ingredient-search-radio';
  const nameRadioID = 'name-search-radio';
  const enterBtnID = 'exec-search-btn';
  test('Checks alert name functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    window.alert = vi.fn(() => {});

    const searchBtn = screen.getByTestId(searchBtnID);
    await user.click(searchBtn);

    const searchInput = await screen.findByTestId(serchInputID);
    const nameRadio = await screen.findByTestId(nameRadioID);
    const enterBtn = await screen.findByTestId(enterBtnID);

    await user.type(searchInput, 'aaa');
    await user.click(nameRadio);

    await user.click(enterBtn);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters');
      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('Checks alert fristLetter functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    window.alert = vi.fn(() => {});

    const searchBtn = screen.getByTestId(searchBtnID);
    await user.click(searchBtn);

    const searchInput = await screen.findByTestId(serchInputID);
    const firstLetterRadio = await screen.findByTestId(firstLetterID);
    const enterBtn = await screen.findByTestId(enterBtnID);

    await user.type(searchInput, 'aaa');
    await user.click(firstLetterRadio);

    await user.click(enterBtn);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(window.alert).toHaveBeenCalledTimes(1);
    // await waitFor(() => {
    // });
  });

  test('Checks filter name functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    window.alert = vi.fn(() => {});

    const searchBtn = screen.getByTestId(searchBtnID);
    await user.click(searchBtn);

    const searchInput = await screen.findByTestId(serchInputID);
    const nameRadio = await screen.findByTestId(nameRadioID);
    const enterBtn = await screen.findByTestId(enterBtnID);

    await user.type(searchInput, 'Arrabiata');
    await user.click(nameRadio);

    await user.click(enterBtn);

    await screen.findByRole('heading', { level: 1, name: 'Spicy Arrabiata Penne' });
  });

  test('Check if you click on drinks', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const searchBtn = await screen.findByTestId(searchBtnID);

    await user.click(searchBtn);

    const searchInput = await screen.findByTestId(serchInputID);
    const ingredientRadio = await screen.findByTestId(ingredientInputID);
    const enterBtn = await screen.findByTestId(enterBtnID);

    let article = await screen.findAllByRole('link');

    expect(article).toHaveLength(12);

    await user.type(searchInput, 'banana');
    await user.click(ingredientRadio);

    await user.click(enterBtn);

    await waitFor(async () => {
      article = screen.getAllByRole('img');
      expect(article).toHaveLength(3);
    });
  });
  test('Check if you redirected to page profile', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks');

    const profileBtn = screen.getByTestId(profileBtnID);
    await user.click(profileBtn);

    await screen.findByRole('heading', { level: 1, name: 'Profile' });
  });
  // test('Checks buttons category functionality', async () => {
  //   const { user } = renderWithRouterAndRedux(<App />, '/drinks');

  //   let categoriesBtn = await screen.findAllByTestId(/-category-filter/i);

  //   screen.debug();

  //   expect(categoriesBtn).toHaveLength(6);
  //   expect(categoriesBtn[1]).toHaveTextContent('Cocktail');

  //   await user.click(categoriesBtn[1]);

  //   const allArticle = await screen.findAllByRole('article');

  //   expect(allArticle).toHaveLength(12);
  //   expect(allArticle[1]).toHaveTextContent('155 Belmont');

  //   categoriesBtn = await screen.findAllByTestId(/-category-filter/i);

  //   // await user.click(categoriesBtn[1]);

  //   // allArticle = await screen.findAllByRole('article');

  //   // expect(allArticle).toHaveLength(12);
  //   // expect(allArticle[0]).toHaveTextContent('A1');
  // });
});
