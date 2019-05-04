
import React, { Component } from 'react';
import { boundMethod } from 'autobind-decorator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authenticationOperations } from '../../../state/auth';
import View from '../../components/Login';

class LoginContainer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
    if(localStorage.getItem('email')) {
      this.setState({
        'email': localStorage.getItem('email'),
        'remember': true
      });
    }
  }

  @boundMethod
  handleChange(field, event) {
    if(event) {
      const { value } = event.target;
      this.setState({ [field]: value });
    }
  }
  
  @boundMethod
  submitForm() {
    if(this.state.remember) {
      localStorage.setItem('email', this.state.email);
    } else {
      localStorage.removeItem('email');
    }
    this.props.logIn({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const properties = {
      handleChange: this.handleChange,
      submitForm: this.submitForm,
      email: this.state.email,
      password: this.state.password,
      remember: this.state.remember,
      history: this.props.history
    }; 

    if (this.props.authenticated) {
      this.props.history.push('/dashboard');
    }

    return (
      <View { ...properties } />
    );
  }
}

const mapStateToProps = ({ authenticationState }) => {
  return { authenticated: authenticationState.authenticated };
}

const mapDispatchToProps = {
  logIn: authenticationOperations.logIn
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));