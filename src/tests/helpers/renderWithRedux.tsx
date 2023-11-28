import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { GlobalState } from '../../types';
import rootReducer from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component: JSX.Element,
  route = '/',
  state: GlobalState | undefined = undefined,
  store = createStore(rootReducer, state, applyMiddleware(thunk)),
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
