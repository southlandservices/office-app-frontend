import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import baseStyles from '../assets/styles/base';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './containers/UserList';
import User from './containers/User';
import Menu from './containers/Menu/MenuContainer';
import { authenticationActions, authenticationOperations } from '../state/auth';
import { decodeToken } from '../utils/misc';

const root = Object.assign({}, baseStyles, {
  backgroundColor: '#F9FAFB',
  margin: '-10px -7px 0px -7px'
});

const styles = theme => ({
  root,
  pageContainer: {
    maxWidth: 1200,
    paddingTop: 30,
    margin: '0 auto'
  },
  contentArea: {
    paddingBottom: 75,
    minHeight: '90vh'
  }
});

class App extends Component {

  isAuthenticated() {
    return !!this.props.authenticated;
  }

  localStorageHasCredentials() {
    return !!localStorage.getItem('token');
  }

  setAuthenticationFromLocalStorage() {
    const decoded = decodeToken(localStorage.getItem('token'));
    const userRole = decoded.role;
    this.props.setAuthentication({
      token: localStorage.getItem('token'),
      user: { userRole }
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
  }

  @boundMethod
  logOut() {
    this.props.doLogOut();
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        { this.checkAuth() }
          <div className={ classes.contentArea }>
          <Header isAuthenticated={!!this.props.authenticated} logOut={this.logOut} />
          <Menu />
          <div className={classes.pageContainer}>
            <Switch>
              <Route exact={true} path="/" render={() => <Login />} />
              <Route exact={true} path="/dashboard" render={() => <Dashboard />} />
              <Route exact={true} path="/users" render={() => <UserList />} />
              <Route path="/users/:userId" render={({match}) => <User id={match.params.userId} /> } />
            </Switch>
          </div>
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
  setAuthentication: authenticationActions.setAuthentication,
  doLogOut: authenticationOperations.logOut
}

const styledApp = withStyles(styles)(App);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(styledApp));