import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Verificando o componente footer', () => {
  test('Verificando se o Footer renderiza corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    await user.click(screen.getByTestId('drinks-bottom-btn'));

    expect(screen.getByText('Loading...')).toBeVisible();

    let article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);

    await user.click(screen.getByTestId('meals-bottom-btn'));

    expect(screen.getByText('Loading...')).toBeVisible();

    article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);
  });
});
