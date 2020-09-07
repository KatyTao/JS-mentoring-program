import React from 'react';
import './App.css';
import './style.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {
          Routes.map(({name, path, exact = true, component})=> (
            <Route path={path} exact={exact} component={component} key={name} />
          ))
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
