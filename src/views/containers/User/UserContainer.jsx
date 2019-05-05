import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userOperations } from '../../../state/user';
import View from '../../components/User';

class User extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getOne(id);
  }

  render() {
    return (
      <View user={this.props.user} />
    )
  }
}

const mapStateToProps = ({ userState }) => {
  return { user: userState.user };
};

const mapDispatchToProps = {
  getOne: userOperations.getOne
};

export default connect(mapStateToProps, mapDispatchToProps)(User);