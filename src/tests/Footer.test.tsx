import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Verificando o componente footer', () => {
  test('Verificando se o Footer renderiza corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await user.click(drinksBtn);

    let loading = screen.getByRole('heading', { level: 1, name: 'Loading ...' });

    expect(loading).toBeVisible();

    const article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);

    await user.click(mealsBtn);

    loading = screen.getByRole('heading', { level: 1, name: 'Loading ...' });

    expect(loading).toBeVisible();
  });
});
