import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import Terminals from './Terminals';
import BuyersMaterial from "./BuyersMaterial";
import Buyer from './Buyer';
import Sidebar from './Sidebar';
import {NotFound} from "./NotFound";
import PrivateRoute from "../private-route/private-route";

function App() {
  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;
