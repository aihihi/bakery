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
} from '../../Employee/selectors';
import {
  loadStorePerIdRequest,
  saveStoreRequest,
  updateStoreRequest,
  resetStoreSuccess,
} from '../actions';

import {
  loadEmployeeListRequest,
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
          employees: null,
        },
      };
    }
  }

  componentDidMount() {
    this.props.actions.loadEmployeeListRequest();
  }

  handleEmployeeChange = value => {
    this.setState({
      employees: value,
    });
  };
  handleFormChange = values => this.setState({ values });

  handleFormSubmit = () => {
    const { actions } = this.props;
    (this.state.mode === UPDATE_EDIT)
      ? actions.updateStoreRequest(this.state.values)
      : actions.saveStoreRequest(this.state.values);
  }

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
    const { requestError, employeeList } = this.props;

    return (
      <div>
        <StoreInputForm
          initialValues={values}
          employeeList={employeeList}
          onEmployeeChange={this.handleEmployeeChange}
          selectedEmployees={this.state.employees}
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
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      saveStoreRequest,
      updateStoreRequest,
      loadStorePerIdRequest,
      resetStoreSuccess,
      loadEmployeeListRequest,
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
