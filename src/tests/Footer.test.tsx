import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Layout from '../components/Header/Layout';

describe('Verificando o componente footer', () => {
  test('Verificando se o Footer renderiza corretamente', () => {
    renderWithRouter(<Layout />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Verifica se o botão redireciona à página de bebidas', async () => {
    renderWithRouter(<Layout />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    await userEvent.click(drinksBtn);
    expect(window.location.pathname).toBe('/drinks');
  });

  test('verifica se o botão redireciona à página de comidas', async () => {
    renderWithRouter(<Layout />);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await userEvent.click(mealsBtn);
    expect(window.location.pathname).toBe('/meals');
  });
});
