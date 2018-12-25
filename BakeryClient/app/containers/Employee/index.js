
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
} from 'containers/App/selectors';
// import messages from '../messages';
import { makeSelectEmployeeList, makeSelectCurrentEmployee, makeSelectRequestError, makeSelectRequestSuccess } from './selectors';
import { loadEmployeeListRequest, deleteEmployeeRequest, setCurrentEmployee, resetEmployeeSuccess } from './actions';
import EmployeeInput from './EmployeeInput';
import EmployeeList from './EmployeeList';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Employee extends React.Component {

  componentDidMount() {
    this.props.actions.loadEmployeeListRequest();
  }

  componentDidUpdate(prevProps) {
    const { currentEmployee, actions } = this.props;
    if (prevProps.currentEmployee !== currentEmployee) {
      actions.loadEmployeeListRequest();
    }
  }

  render() {
    return (
      <div>
        {/*<Redirect exact from={`${this.props.match.url}`} to={`${this.props.match.url}/list`}/>*/}
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            exact
            render={(routeProps) => (
              <EmployeeList {...routeProps} data={this.props.employeeList} />
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            exact
            render={(routeProps) => (
              <EmployeeList
                data={this.props.employeeList}
                deleteEmployeeRequest={this.props.actions.deleteEmployeeRequest}
                setCurrentEmployee={this.props.actions.setCurrentEmployee}
                requestSuccess={this.props.requestSuccess}
                requestError={this.props.requestError}
                resetEmployeeSuccess={this.props.actions.resetEmployeeSuccess}
              />
            )}
          />
          <Route
            path={`${this.props.match.url}/add-new`}
            exact
            component={EmployeeInput}

          />
          { this.props.employeeList && this.props.employeeList.length &&
            <Route
              path={`${this.props.match.url}/:id`}
              exact
              render={props => <EmployeeInput {...props} />}
            /> }

        </Switch>
      </div>

    );
  }
}

Employee.propTypes = {
  actions: PropTypes.object,
  employeeList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  employeeList: makeSelectEmployeeList(),
  currentEmployee: makeSelectCurrentEmployee(),
  requestSuccess: makeSelectRequestSuccess(),
  requestError: makeSelectRequestError(),
});


const mapDispatchToProps = (dispatch) => ({actions:
    bindActionCreators({
      loadEmployeeListRequest,
      deleteEmployeeRequest,
      setCurrentEmployee,
      resetEmployeeSuccess,
    },
      dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'employee', reducer });
const withSaga = injectSaga({ key: 'employee', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Employee);
