import { screen, fireEvent } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

// describe('Check page Profile', () => {
//   // test('Checks profile functionality', async () => {
//   //   const { user } = renderWithRouterAndRedux(<App />, '/profile');
//   //   screen.getByRole('heading', { level: 1, name: 'Profile' });

//   //   await user.click(screen.getByTestId('profile-top-btn'));
//   // });
// });
    const userEmailElement = screen.getByTestId('profile-email');
    expect(userEmailElement).toBeInTheDocument();

    const profileBtnID = screen.getByTestId('profile-top-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const searchBtnID = screen.queryByTestId('search-top-btn');
    const titleID = screen.getByTestId('page-title');

    expect(doneRecipesBtn).toBeVisible();
    expect(titleID).toHaveTextContent('Profile');
    expect(profileBtnID).toBeVisible();
    expect(searchBtnID).not.toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeVisible();
    expect(logoutBtn).toBeVisible();

    await user.click(profileBtnID);

    fireEvent.click(doneRecipesBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('verifica se após o click a pagina é redirecionada para receitas favoritas', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });
  test('verifica se após o click a pagina é redirecionada para tela de login', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/profile');

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutBtn);
    expect(window.location.pathname).toBe('/');
  });
});

