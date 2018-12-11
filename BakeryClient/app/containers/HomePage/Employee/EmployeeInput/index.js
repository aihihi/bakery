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
import { EditTwoTone } from '@material-ui/icons';

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
      this.state = {
        openDialog: false,
        mode: UPDATE_EDIT,
        // mode: ADD_NEW,
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

  handleFormChange = (values) => this.setState({ values })

  handleFormSubmit = () => {
    const { actions } = this.props;
    (this.state.mode === UPDATE_EDIT) ?
      actions.updateEmployeeRequest(this.state.values) :
      actions.saveEmployeeRequest(this.state.values);
  }

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.props.actions.resetEmployeeSuccess();
    this.setState({ openDialog: false });
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { requestError } = this.props;
  //   if (prevProps.requestError !== requestError && requestError )
  // }

  render() {
    const { mode, values, openDialog } = this.state;
    const { requestError } = this.props;

    return (
      <div>
        <EmployeeInputForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
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
