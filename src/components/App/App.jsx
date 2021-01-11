import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Home from "../Home/Home";
import Auth from "../Auth/Auth";
import Terminals from "../Terminals/Terminals";
import Buyers from "../Buyers/Buyers";
import Buyer from "../Buyer/Buyer";
import Sidebar from "../Sidebar/Sidebar";
import {NotFound} from "../NotFound/NotFound";
import PrivateRoute from "../private-route/private-route";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles["app-container"]}>
      <BrowserRouter>
        <Sidebar />
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/login"} exact component={Auth} />
          <PrivateRoute 
            path={"/terminals"} 
            exact 
            render={() => <Terminals />}
          />
          <PrivateRoute 
            path={"/buyers"} 
            exact 
            render={() => <Buyers />}
          />
          <PrivateRoute 
            path={"/buyers/:id"} 
            exact
            render={({match}) => {
                return (
                  <Buyer currentBuyerId={match.params.id} />
                );
              }}
            />
            <Route path={"/notfound"} exact component={NotFound} />
            <Redirect to="/notfound" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
