import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRedux';
import fecthMock from './mock/fecthmock';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(fecthMock as any);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Check page Recipes in Progress', () => {
  const route = '/drinks/17222/in-progress';
  test('Checks checkbox functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, route);

    let allCheckbox = await screen.findAllByRole('checkbox');

    await user.click(allCheckbox[0]);
    await user.click(allCheckbox[1]);
    await user.click(allCheckbox[2]);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();

    await user.click(allCheckbox[2]);

    allCheckbox = await screen.findAllByRole('checkbox', { checked: true });
    expect(allCheckbox).toHaveLength(2);
  });
  test('Checks button finish functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, route);

    let allCheckbox = await screen.findAllByRole('checkbox', { checked: true });
    expect(allCheckbox).toHaveLength(2);

    allCheckbox = await screen.findAllByRole('checkbox');
    await user.click(allCheckbox[2]);
    await user.click(allCheckbox[3]);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    await user.click(finishBtn);

    screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
  });
});
