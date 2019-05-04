import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import baseStyles from '../assets/styles/base';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './containers/UserList';
import Menu from './containers/Menu/MenuContainer';
import { authenticationActions } from '../state/auth';

const root = Object.assign({}, baseStyles, {
  height: '100vh',
  flexGrow: 1,
  backgroundColor: '#F9FAFB',
  margin: '-10px -10px 0px -10px'
});

const styles = theme => ({
  root,
  pageContainer: {
    maxWidth: 1200,
    paddingTop: 30,
    margin: '0 auto'
  }
});

class App extends Component {

  isAuthenticated() {
    return !!this.props.authenticated;
  }

  localStorageHasCredentials() {
    return !!(localStorage.getItem('token') && localStorage.getItem('userRole'));
  }

  setAuthenticationFromLocalStorage() {
    this.props.setAuthentication({
      token: localStorage.getItem('token'),
      user: { userRole: localStorage.getItem('userRole') }
    })
  }

  checkAuth() {
    if(!this.isAuthenticated() && this.props.history.location.pathname !== '/') {
      if(this.localStorageHasCredentials()) {
        this.setAuthenticationFromLocalStorage();
      } else {
        this.props.history.push('/');
      }
    }
    // if(
    //   (!this.props.authenticated || !(localStorage.getItem('token') && localStorage.getItem('userRole') )) && 
    //   this.props.history.location.pathname !== '/'
    // ) {
    //   this.props.history.push('/');
    // }
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { this.checkAuth() }
        <Header />
        <Menu />
        <div className={classes.pageContainer}>
          <Switch>
            <Route exact={true} path="/" render={() => <Login />} />
            <Route exact={true} path="/dashboard" render={() => <Dashboard />} />
            <Route exact={true} path="/users" render={() => <UserList />} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

const { object } = PropTypes;
App.propTypes = {
  classes: object.isRequired
};

const mapStateToProps = ({ authenticationState }) => {
  return { authenticated: authenticationState.authenticated };
}

const mapDispatchToProps = {
  setAuthentication: authenticationActions.setAuthentication
}

const styledApp = withStyles(styles)(App);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(styledApp));