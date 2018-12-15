import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { ADD_NEW, UPDATE_EDIT } from '../../../../utils/constants';
import { makeSelectEmployeePerId, makeSelectEmployeeList, makeSelectRequestError, makeSelectRequestSuccess } from '../selectors';
import { loadEmployeePerIdRequest, saveEmployeeRequest, updateEmployeeRequest, resetEmployeeSuccess, } from '../actions';
import EmployeeInputForm from './EmployeeInputForm';
import AlertDialogSlide from '../EmployeeDialogSlide';
// import { EditTwoTone } from '@material-ui/icons';
import moment from 'moment';
class EmployeeInput extends React.Component {
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
    const { employeeList } = this.props;
    const { id } = this.props.match.params;

    if (id && employeeList.length) {
      const currentEmployee = employeeList.find(employee => (
        employee.id === id
      ));
      const { birthday, joinedDate } = currentEmployee;
      currentEmployee.birthday = birthday ? moment(birthday).format('YYYY-MM-DD') : '';
      currentEmployee.joinedDate = joinedDate ? moment(joinedDate).format('YYYY-MM-DD') : '';
      this.state = {
        openDialog: false,
        mode: UPDATE_EDIT,
        values: currentEmployee,
      };
    } else {
      this.state = {
        openDialog: false,
        mode: ADD_NEW,
        values: {
          id: '',
          fullName: '',
          mobilePhone: '',
          address: '',
          birthday: '',
          joinedDate: '',
          note: '',
        },
      };
    }

  }

  handleFormChange = (values) => this.setState({ values });

  handleFormSubmit = () => {
    const { actions } = this.props;
    (this.state.mode === UPDATE_EDIT) ?
      actions.updateEmployeeRequest(this.state.values) :
      actions.saveEmployeeRequest(this.state.values);
  }

  handleGoToList = () => this.props.history.push('/employee/list')

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.props.actions.resetEmployeeSuccess();
    this.setState({ openDialog: false });
  };

  render() {
    const { mode, values, openDialog } = this.state;
    const { requestError } = this.props;

    return (
      <div>
        <EmployeeInputForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          onCancel={this.handleGoToList}
          disabled={false}
          busy={false}
        />
        <AlertDialogSlide message={requestError} open={this.state.openDialog && requestError} handleClose={this.handleClose} />
        { openDialog && <AlertDialogSlide message={'Successfully Update Database'} open handleClose={this.handleClose}/> }
      </div>
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentEmployee: makeSelectEmployeePerId(),
  employeeList: makeSelectEmployeeList(),
  requestError: makeSelectRequestError(),
  requestSuccess: makeSelectRequestSuccess(),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    saveEmployeeRequest,
    updateEmployeeRequest,
    loadEmployeePerIdRequest,
    resetEmployeeSuccess}, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

EmployeeInput.propTypes = {
  actions: PropTypes.object,
  match: PropTypes.object,
};

export default compose(
  withConnect,
  withRouter,
)(EmployeeInput);
