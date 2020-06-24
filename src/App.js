import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import { connect } from 'react-redux';
import {setLoggedState} from './redux/actions'
import "./App.css";

function App(props) {
    
    useEffect(() => {
      if (localStorage.getItem('token')){
        localStorage.setItem('logged', true)
        props.setLoggedState(true)
      } else if (localStorage.getItem('token') === null){
        localStorage.setItem('logged', false)
        props.setLoggedState(false)
      }
    }, [props.isLogged, props.setLoggedState])
  return (
    <Router>
    <div>
    <div>
      <Navigation />
    
      <Switch>
        <Route exact path="/">
          <Redirect to='/dashboard'/>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
      </Switch>
    </div>
    </div>
    </Router>
  );
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {setLoggedState})(App);
