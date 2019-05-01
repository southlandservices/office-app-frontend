import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, withRouter, Switch } from 'react-router-dom';
import baseStyles from '../assets/styles/base';
import Dashbaord from './containers/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import UserList from './containers/UserList';

const root = Object.assign({}, baseStyles, {
  height: '100vh',
  flexGrow: 1,
  backgroundColor: '#F9FAFB',
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
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.pageContainer}>
          <Switch>
            <Route exact={true} path="/" render={() => <Dashbaord />} />
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

const styledApp = withStyles(styles)(App);
export default withRouter(styledApp);