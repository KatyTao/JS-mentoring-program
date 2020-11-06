import React from 'react';
import './App.css';
import './style.css';
import { Provider } from 'react-redux';
import {configureStore} from './store';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './routes';
const {store, persistor} = configureStore()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            {
              Routes.map(({ name, path, exact = true, component }) => (
                <Route path={path} exact={exact} component={component} key={name} />
              ))
            }
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
