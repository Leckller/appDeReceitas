import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Verificando o componente footer', () => {
  test('Verificando se o Footer renderiza corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await user.click(drinksBtn);

    let loading = screen.getByText('Loading...');

    let article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await user.click(mealsBtn);

    loading = screen.getByText('Loading...');

    article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);
  });
});
