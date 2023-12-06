import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import App from '../App';
import fecthMock from './mock/fecthmock';

// beforeEach(() => {
//   vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
//   vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
// });

// afterEach(() => {
//   vi.clearAllMocks();
// });

describe.only('Verificando o componente footer', () => {
  test('Verificando se o Footer renderiza corretamente', async () => {
    const loadingID = 'Loading...';
    const { user } = renderWithRouterAndRedux(<App />, '/meals');

    await user.click(screen.getByTestId('drinks-bottom-btn'));

    let loading = screen.getByText(loadingID);
    expect(loading).toBeVisible();

    let article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);

    loading = screen.getByText(loadingID);

    expect(loading).not.toBeVisible();

    await user.click(screen.getByTestId('meals-bottom-btn'));

    loading = screen.getByText(loadingID);

    expect(loading).toBeVisible();

    article = await screen.findAllByRole('article');

    expect(article).toHaveLength(12);
  });
});
