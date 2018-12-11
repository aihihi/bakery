/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter, Link } from 'react-router-dom';

import {
} from 'containers/App/selectors';
// import messages from '../messages';
import { makeSelectEmployeeList, makeSelectCurrentEmployee } from './selectors';
import { loadEmployeeListRequest, deleteEmployeeRequest } from './actions';
import EmployeeInput from './EmployeeInput';
import EmployeeList from './EmployeeList';

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
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            // path="/employee/list"
            exact
            render={(routeProps) => (
              <EmployeeList {...routeProps} data={this.props.employeeList} />
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            exact
            render={(routeProps) => (
              <EmployeeList {...routeProps} data={this.props.employeeList} deleteEmployeeRequest={this.props.actions.deleteEmployeeRequest}/>
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
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadEmployeeListRequest, deleteEmployeeRequest }, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(Employee);
