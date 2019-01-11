
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// import messages from '../messages';
import { makeSelectWorkingDayList, makeSelectCurrentWorkingDay, makeSelectRequestError, makeSelectRequestSuccess } from './selectors';
import {
  loadWorkingDayListRequest,
  deleteWorkingDayRequest,
  setCurrentWorkingDay,
  resetWorkingDaySuccess,
} from './actions';
import {
  loadStoreListRequest
} from '../Store/actions';
import {
  makeSelectEmployeeList
} from '../Employee/selectors';

import {
  makeSelectStoreList
} from '../Store/selectors';

import {
  loadEmployeeListRequest
} from '../Employee/actions';

import WorkingDayInput from './WorkingDayInput';
import WorkingDayList from './WorkingDayList';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class WorkingDay extends React.Component {

  
  componentDidMount() {
    this.props.actions.loadStoreListRequest();
    this.props.actions.loadEmployeeListRequest();
    this.props.actions.loadWorkingDayListRequest();

  }

  // componentDidUpdate(prevProps) {
  //   const { currentWorkingDay, actions } = this.props;
  //   if (prevProps.currentWorkingDay !== currentWorkingDay) {
  //     actions.loadWorkingDayListRequest();
  //   }
  // }

  render() {
    const { employeeList, storeList, workingDayList } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            exact
            component={WorkingDayList}
            // render={(routeProps) => (
            //   <WorkingDayList {...routeProps} data={this.props.workingDayList} />
            // )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            exact
            component={WorkingDayList}
            // render={(routeProps) => (
            //   <WorkingDayList
            //     {...routeProps}
            //     data={this.props.workingDayList}
            //     deleteWorkingDayRequest={this.props.actions.deleteWorkingDayRequest}
            //     setCurrentWorkingDay={this.props.actions.setCurrentWorkingDay}
            //     requestSuccess={this.props.requestSuccess}
            //     requestError={this.props.requestError}
            //     resetWorkingDaySuccess={this.props.actions.resetWorkingDaySuccess}
            //   />
            // )}
          />
          <Route
            path={`${this.props.match.url}/add-new`}
            exact
            component={WorkingDayInput}

          />
          {employeeList && employeeList.length && storeList && storeList.length && workingDayList &&
            workingDayList.length &&
            <Route
              path={`${this.props.match.url}/:id`}
              exact
              render={props => <WorkingDayInput {...props} />}
            />}

        </Switch>
      </div>

    );
  }
}

WorkingDay.propTypes = {
  actions: PropTypes.object,
  workingDayList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  workingDayList: makeSelectWorkingDayList(),
  currentWorkingDay: makeSelectCurrentWorkingDay(),
  requestSuccess: makeSelectRequestSuccess(),
  requestError: makeSelectRequestError(),
  storeList: makeSelectStoreList(),
  employeeList: makeSelectEmployeeList(),
});


const mapDispatchToProps = (dispatch) => ({actions:
    bindActionCreators({
      loadWorkingDayListRequest,
      deleteWorkingDayRequest,
      setCurrentWorkingDay,
      resetWorkingDaySuccess,
      loadStoreListRequest,
      loadEmployeeListRequest,
    },
      dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'workingDay', reducer });
const withSaga = injectSaga({ key: 'workingDay', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(WorkingDay);
