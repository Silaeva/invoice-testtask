import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Terminals from './pages/Terminals';
import BuyersMaterial from "./pages/BuyersMaterial";
import Buyer from './pages/Buyer';
import Sidebar from './components/Sidebar';
import {NotFound} from "./pages/NotFound";
import PrivateRoute from "./private-route/private-route";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/login'} exact component={Auth} />
        <PrivateRoute 
          path={'/terminals'} 
          exact 
          render={() => <Terminals />}
        />
        <PrivateRoute 
          path={'/buyers'} 
          exact 
          render={() => <BuyersMaterial />}
        />
        <PrivateRoute 
          path={'/buyers/:id'} 
          exact
          render={({match}) => {
              return (
                <Buyer currentBuyerId={match.params.id} />
              );
            }}
          />
          <Route path={'/notfound'} exact component={NotFound} />
          <Redirect to="/notfound" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
