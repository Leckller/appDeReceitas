import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRedux';

describe('Check page Login', () => {
  const emailInputID = 'email-input';
  const loginBtnID = 'login-submit-btn';
  const passwordInputID = 'password-input';

  const password = '1234567';
  test('Checks login functionality', async () => {
    const { user } = renderWithRouterAndRedux(
      <App />,
    );
    let emailInput = screen.getByTestId(emailInputID);
    let passwordInput = screen.getByTestId(passwordInputID);
    let enterBtn = screen.getByTestId(loginBtnID);

    expect(enterBtn).toBeDisabled();

    await user.type(emailInput, 'email@.com');
    await user.type(passwordInput, password);

    enterBtn = screen.getByTestId(loginBtnID);

    expect(enterBtn).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    emailInput = screen.getByTestId(emailInputID);
    passwordInput = screen.getByTestId(passwordInputID);
    enterBtn = screen.getByTestId(loginBtnID);

    await user.type(emailInput, 'email@email.com');
    await user.type(passwordInput, password);

    await user.click(enterBtn);

    screen.getByRole('heading', { level: 1, name: 'Meals' });
  });
});
