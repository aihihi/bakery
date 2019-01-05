import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import connect from 'react-redux/es/connect/connect';
import { ADD_NEW, UPDATE_EDIT } from 'utils/constants';
import {
  makeSelectStorePerId,
  makeSelectStoreList,
  makeSelectRequestError,
  makeSelectRequestSuccess,
} from '../selectors';
import {
  makeSelectEmployeeList,
  makeSelectEmployeesPerStore,
} from '../../Employee/selectors';
import {
  loadStorePerIdRequest,
  saveStoreRequest,
  updateStoreRequest,
  resetStoreSuccess,
} from '../actions';

import {
  loadEmployeeListRequest,
  setEmployeeWorkingFor,
  loadEmployeePerStoreRequest,
  setEmployeesPerStore,
} from '../../Employee/actions';

import StoreInputForm from './StoreInputForm';
import AlertDialogSlide from 'components/DialogSlide';


class StoreInput extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { requestError, requestSuccess } = nextProps;
    if (requestError) {
      return { requestError, openDialog: true };
    }
    if (requestSuccess) {
      return { openDialog: true };
    }
    return null;
  }
  constructor(props) {
    super(props);
    const { storeList } = this.props;
    const { id } = this.props.match.params;

    if (id && storeList.length) {
      const currentStore = storeList.find(store => (
        store.id === id
      ));
      const { birthday, firstOpenedDate } = currentStore;
      currentStore.birthday = birthday ? moment(birthday).format('YYYY-MM-DD') : '';
      currentStore.firstOpenedDate = firstOpenedDate ? moment(firstOpenedDate).format('YYYY-MM-DD') : '';
      this.state = {
        openDialog: false,
        mode: UPDATE_EDIT,
        values: currentStore,
        // selectedEmployees: null,
      };
    } else {
      this.state = {
        openDialog: false,
        mode: ADD_NEW,
        values: {
          id: '',
          name: '',
          address: '',
          firstOpenedDate: '',
          storeLeader: '',
          note: '',
        },
        // selectedEmployees: null,
      };
    }
  }

  componentDidMount() {
    this.props.actions.loadEmployeeListRequest();
    this.props.actions.loadEmployeePerStoreRequest(this.state.values.id);
  }

  handleEmployeeChange = value => {
    if (value && value.length > 0) {
      this.props.actions.setEmployeesPerStore(value);
    }
  };
  handleFormChange = values => this.setState({ values });

  handleFormSubmit = () => {
    const { actions, employeesPerStore } = this.props;
    const { values } = this.state;
    (this.state.mode === UPDATE_EDIT)
      ? actions.updateStoreRequest(values)
      : actions.saveStoreRequest(values);
    const employeeIds = employeesPerStore.map(emp => emp.id);
    actions.setEmployeeWorkingFor(values.id, employeeIds);
  };

  handleGoToList = () => this.props.history.push('/store/list');

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.props.actions.resetStoreSuccess();
    this.setState({ openDialog: false });
  };

  render() {
    const { values, openDialog } = this.state;
    const { requestError, employeeList, employeesPerStore } = this.props;

    return (
      <div>
        <StoreInputForm
          initialValues={values}
          employeeList={employeeList}
          employeesPerStore={employeesPerStore}
          onEmployeeChange={this.handleEmployeeChange}
          // selectedEmployees={this.state.selectedEmployees}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          onCancel={this.handleGoToList}
          disabled={false}
          busy={false}
        />
        <AlertDialogSlide message={requestError} open={this.state.openDialog && requestError} handleClose={this.handleClose} />
        { openDialog && <AlertDialogSlide message='Successfully Update Database' open handleClose={this.handleClose}/> }
      </div>
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentStore: makeSelectStorePerId(),
  storeList: makeSelectStoreList(),
  requestError: makeSelectRequestError(),
  requestSuccess: makeSelectRequestSuccess(),
  employeeList: makeSelectEmployeeList(),
  employeesPerStore: makeSelectEmployeesPerStore(),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      saveStoreRequest,
      updateStoreRequest,
      loadStorePerIdRequest,
      resetStoreSuccess,
      loadEmployeeListRequest,
      setEmployeeWorkingFor,
      loadEmployeePerStoreRequest,
      setEmployeesPerStore,
    },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

StoreInput.propTypes = {
  actions: PropTypes.object,
  match: PropTypes.object,
  storeList: PropTypes.array,
  employeeList: PropTypes.array,
  requestError: PropTypes.object,
};

export default compose(
  withConnect,
  withRouter,
)(StoreInput);
