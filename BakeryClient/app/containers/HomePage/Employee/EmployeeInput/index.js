import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { ADD_NEW, UPDATE_EDIT } from '../../../../utils/constants';
import { makeSelectEmployeePerId } from '../selectors';
import { loadEmployeePerIdRequest, saveEmployeeRequest } from '../actions';
import EmployeeInputForm from './EmployeeInputForm';

class EmployeeInput extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.mode === UPDATE_EDIT && props.currentEmployee && props.currentEmployee.id !== state.values.id) {
    // if (state.mode === UPDATE_EDIT && props.currentEmployee) {
      // return { values: props.currentEmployee };
      return { values: props.currentEmployee };
    }
    return { values: {}};
  }

  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.actions.loadEmployeePerIdRequest(id);

      this.setState({
        mode: UPDATE_EDIT,

      });

    }
  }

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
    this.props.actions.saveEmployeeRequest(this.state.values);
  }

  render() {
    const { mode, values } = this.state;
    const renderingForm =
      <EmployeeInputForm
        initialValues={values}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        disabled={false}
        busy={false}
      />;
    // if (mode === UPDATE_EDIT) {
    //   return (this.props.currentEmployee && <EmployeeInputForm
    //     initialValues={this.props.currentEmployee}
    //     onSubmit={this.handleFormSubmit}
    //     onChange={this.handleFormChange}
    //     disabled={false}
    //     busy={false}
    //   />);
    // }
    if (mode === UPDATE_EDIT) {
      return (
        <div>
          { values.id && renderingForm }

        </div>
      );
    }

    return (
        <EmployeeInputForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          disabled={false}
          busy={false}
        />
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentEmployee: makeSelectEmployeePerId(),

});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ saveEmployeeRequest,
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
