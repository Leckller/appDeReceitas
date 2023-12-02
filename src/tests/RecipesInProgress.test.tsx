import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRedux';

describe('Check page Recipes in Progress', () => {
  test('Checks checkbox functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/17222/in-progress');

    let allCheckbox = await screen.queryAllByRole('checkbox');

    await user.click(allCheckbox[0]);
    await user.click(allCheckbox[1]);
    await user.click(allCheckbox[2]);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();

    allCheckbox = await screen.queryAllByRole('checkbox', { checked: true });
    expect(allCheckbox).toHaveLength(3);
  });
  test('Checks button finish functionality', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/17222/in-progress');

    let allCheckbox = await screen.queryAllByRole('checkbox', { checked: true });
    expect(allCheckbox).toHaveLength(3);

    allCheckbox = await screen.queryAllByRole('checkbox');
    await user.click(allCheckbox[3]);

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).not.toBeDisabled();
    await user.click(finishBtn);

    screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
  });
});
