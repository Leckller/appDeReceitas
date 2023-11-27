import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Drinks', () => {
  const titleID = 'page-title';
  test('Checks drinks functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks');

    const profileBtnID = screen.getByTestId('profile-top-btn');
    const searchBtnID = screen.getByTestId('search-top-btn');
    let title = screen.getByTestId(titleID);

    expect(title).toHaveTextContent('Drinks');
    expect(profileBtnID).toBeVisible();
    expect(searchBtnID).toBeVisible();

    await user.click(searchBtnID);

    const searchInputID = screen.getByTestId('search-input');

    await user.type(searchInputID, 'adsds');

    expect(searchInputID).toHaveValue('adsds');

    await user.click(searchBtnID);

    expect(searchInputID).not.toBeVisible();

    await user.click(profileBtnID);

    title = screen.getByTestId(titleID);
    expect(title).toHaveTextContent('Profile');
  });
});

describe('Check page Meals', () => {
  const titleID = 'page-title';
  test('Checks meals functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const profileBtnID = screen.getByTestId('profile-top-btn');
    const searchBtnID = screen.getByTestId('search-top-btn');
    let title = screen.getByTestId(titleID);

    expect(profileBtnID).toBeVisible();
    expect(searchBtnID).toBeVisible();
    expect(title).toHaveTextContent('Meals');

    await user.click(searchBtnID);

    const searchInputID = screen.getByTestId('search-input');

    await user.type(searchInputID, 'adsds');

    expect(searchInputID).toHaveValue('adsds');

    await user.click(searchBtnID);

    expect(searchInputID).not.toBeVisible();

    await user.click(profileBtnID);

    title = screen.getByTestId(titleID);
    expect(title).toHaveTextContent('Profile');
  });
});
