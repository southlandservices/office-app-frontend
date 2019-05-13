import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobOperations } from '../../../state/job';
import View from '../../components/JobList';

class JobList extends Component {

  componentDidMount() {
    this.props.list();
  }

  render() {
    return(
      <View { ...this.props } />
    )
  }

}

const mapStateToProps = ({ jobState }) => {
  return { jobs: jobState.jobs };
};

const mapDispatchToProps = {
  list: jobOperations.list
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobList));