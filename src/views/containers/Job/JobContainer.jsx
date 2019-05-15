import React from 'react';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { jobOperations } from '../../../state/job';
import { userOperations } from '../../../state/user';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/Job';
import { decodeToken, removeValueFromNestedArray } from '../../../utils/misc';

class Job extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.job);
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.job,
      addFn: this.props.addJob,
      updateFn: this.props.updateJob
    });
  }

  render() {
    const { isNew, redirectToList, isSaving } = this.state;
    const { job } = this.props;
    const decoded = decodeToken(localStorage.getItem('token'));
    const { role } = decoded;
    return (
      <div>
        <PageHeader pageTitle={isNew ? 'Add Job' : 'Update Job' } />
        {
          redirectToList ?
          <Redirect to="/jobs" /> :
          <View
            onChange={this.handleChange}
            onPersist={this.handlePersist}
            isNew={isNew}
            saveInProgress={isSaving}
            item={job}
            role={ role }
            {...this.props}>
            <Form />
          </View>
        }
      </div>
    )
  }
}

const { func, string, object, array } = PropTypes;

Job.propTypes = {
  get: func.isRequired,
  addJob: func.isRequired,
  updateJob: func.isRequired,
  editRefresh: func.isRequired,
  id: string,
  job: object,
  userOptions: array
};

const mapStateToProps = ({ jobState, userState }) => {
  return { 
    job: jobState.job,
    userOptions: userState.users
  };
};

const { get, editRefresh, addJob, updateJob } = jobOperations;

const mapDispatchToProps = { get, editRefresh, addJob, updateJob };

export default connect(mapStateToProps, mapDispatchToProps)(Job);