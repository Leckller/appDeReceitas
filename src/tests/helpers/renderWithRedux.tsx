import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';

const renderWithRouterAndRedux = (
  component: JSX.Element,
  route = '/',
) => {
  window.history.pushState({}, 'Test page', route);
  return {
    ...render(
      <BrowserRouter>
        <Provider store={ store }>
          {component}
        </Provider>
      </BrowserRouter>,
    ),
    user: userEvent.setup(),
    store,
  };
};

export default renderWithRouterAndRedux;
