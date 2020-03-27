import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoutes";
import HomePage from "./components/HomePage";
import Favorites from './components/Favorites'
import LandingPage from "./pages/LandingPage";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/favorites"
        component={Favorites}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/home"
        component={HomePage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route exact path='/' component={LandingPage} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);