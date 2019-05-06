import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Redirect } from 'react-router-dom';
import { userOperations } from '../../../state/user';
import CreateEditComponent from '../../common/CreateEditComponent';
import PageHeader from '../../common/PageHeader';
import View from '../../common/FormWrapper';
import Form from '../../components/User';

class User extends CreateEditComponent {

  constructor(props, context) {
    super(props, context, 'id');
    this.init();
  }

  componentDidMount() {
    this.getItem();
  }

  @boundMethod
  handleChange(name, event) {
    this.change(name, event.target.value, this.props.user);
  }

  @boundMethod
  handlePersist() {
    this.persist({
      item: this.props.user,
      addFn: this.props.addUser,
      updateFn: this.props.updateUser
    });
  }

  render() {
    const { isNew, redirectToList, isSaving } = this.state;
    const { user } = this.props;
    return (
      <div>
        <PageHeader title={ isNew ? 'Add User' : 'Update User' } />
        {
          redirectToList ?
          <Redirect to="/users" /> :
            <View
              onChange={this.handleChange}
              onPersist={this.handlePersist}
              isNew={isNew}
              saveInProgress={isSaving}
              item={user}
              {...this.props}>
              <Form />
            </View>
        }
      </div>
    )
  }
}

const { func, string, object } = PropTypes;

User.propTypes = {
  get: func.isRequired,
  addUser: func.isRequired,
  updateUser: func.isRequired,
  editRefresh: func.isRequired,
  id: string,
  user: object,
};

const mapStateToProps = ({ userState }) => {
  return { user: userState.user };
};

const { get, editRefresh, addUser, updateUser } = userOperations;

const mapDispatchToProps = { get, editRefresh, addUser, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(User);