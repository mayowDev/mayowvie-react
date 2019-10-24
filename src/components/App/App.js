import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../elements/Header/Header";
import Home from "../Home/Home";
import Movie from "../Movie/Movie";
import NotFound from "../elements/NotFound/NotFound";

const App = () => {
  return (
    <Router basename='/mayowvie-react/'>
      <Fragment>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/:movieId' component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
