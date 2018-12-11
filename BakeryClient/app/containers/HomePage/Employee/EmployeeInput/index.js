import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { ADD_NEW, UPDATE_EDIT } from '../../../../utils/constants';
import { makeSelectEmployeePerId, makeSelectEmployeeList, makeSelectRequestError } from '../selectors';
import { loadEmployeePerIdRequest, saveEmployeeRequest, updateEmployeeRequest } from '../actions';
import EmployeeInputForm from './EmployeeInputForm';
import AlertDialogSlide from '../EmployeeDialogSlide';
import { EditTwoTone } from '@material-ui/icons';

class EmployeeInput extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   if (state.mode === UPDATE_EDIT && props.currentEmployee && props.currentEmployee.id !== state.values.id) {
  //   // if (state.mode === UPDATE_EDIT && props.currentEmployee) {
  //     // return { values: props.currentEmployee };
  //     return { values: props.currentEmployee };
  //   }
  //   return { values: {}};
  // }

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

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   if (id) {
  //     this.props.actions.loadEmployeePerIdRequest(id);
  //
  //     this.setState({
  //       mode: UPDATE_EDIT,
  //
  //     });
  //
  //   }
  // }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const { currentEmployee } = this.props;
  //   if (nextProps.currentEmployee && currentEmployee !== nextProps.currentEmployee) {
  //     this.setState({
  //       values: {
  //         fullName: 'ahihi',
  //         mobilePhone: '',
  //         address: '',
  //         birthday: '',
  //         joinedDate: '',
  //         note: '',
  //       },
  //       // values: {
  //       //   fullName: 'dom',
  //       // },
  //       // values: nextProps.currentEmployee,
  //     });
  //     this.forceUpdate();
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // const { id } = this.state.values;
  //
  //   const { currentEmployee } = this.props;
  //   const { mode } = this.state;
  //   if ( mode === UPDATE_EDIT && currentEmployee && prevProps.currentEmployee && currentEmployee.id !== prevProps.currentEmployee.id) {
  //     this.setState({
  //       values: currentEmployee,
  //     });
  //   }
  // }

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
    this.setState({ openDialog: false });
  };
  render() {
    const { mode, values } = this.state;
    const { requestError } = this.props;
    // const renderingForm =
    //   <EmployeeInputForm
    //     initialValues={values}
    //     onSubmit={this.handleFormSubmit}
    //     onChange={this.handleFormChange}
    //     disabled={false}
    //     busy={false}
    //   />;
    // if (mode === UPDATE_EDIT) {
    //   return (this.props.currentEmployee && <EmployeeInputForm
    //     initialValues={this.props.currentEmployee}
    //     onSubmit={this.handleFormSubmit}
    //     onChange={this.handleFormChange}
    //     disabled={false}
    //     busy={false}
    //   />);
    // }
    // if (mode === UPDATE_EDIT) {
    //   return (
    //     <div>
    //       { renderingForm }
    //
    //     </div>
    //   );
    // }

    return (
      <div>
        <EmployeeInputForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          disabled={false}
          busy={false}
        />
        { requestError && <AlertDialogSlide message={requestError} open={this.state.openDialog} /> }
      </div>
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentEmployee: makeSelectEmployeePerId(),
  employeeList: makeSelectEmployeeList(),
  requestError: makeSelectRequestError(),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    saveEmployeeRequest,
    updateEmployeeRequest,
    loadEmployeePerIdRequest }, dispatch),
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
