import { screen } from '@testing-library/dom';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';

describe('Check page Details', () => {
  test('Checks meals details functionality', async () => {
    renderWithRouterAndRedux(<App />, '/meals/52771');

    screen.getByText(/details meals/i);
  });
});
