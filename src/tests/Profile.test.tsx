import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Profile', () => {
  test('Checks profile functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');

    const profileBtnID = screen.getByTestId('profile-top-btn');
    const searchBtnID = screen.queryByTestId('search-top-btn');
    let titleID = screen.getByTestId('page-title');

    expect(titleID).toHaveTextContent('Profile');
    expect(profileBtnID).toBeVisible();
    expect(searchBtnID).not.toBeInTheDocument();

    await user.click(profileBtnID);

    titleID = screen.getByTestId('page-title');
    expect(titleID).toHaveTextContent('Profile');
  });
});
