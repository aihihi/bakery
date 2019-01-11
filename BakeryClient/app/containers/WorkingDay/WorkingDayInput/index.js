import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { ADD_NEW, UPDATE_EDIT } from 'utils/constants';
import { makeSelectWorkingDayPerId, makeSelectWorkingDayList, makeSelectRequestError, makeSelectRequestSuccess } from '../selectors';
import { loadWorkingDayPerIdRequest, saveWorkingDayRequest, updateWorkingDayRequest, resetWorkingDaySuccess, } from '../actions';
import WorkingDayInputForm from './WorkingDayInputForm';
import AlertDialogSlide from 'components/DialogSlide';
// import { EditTwoTone } from '@material-ui/icons';
import moment from 'moment';

import {
  loadEmployeeListRequest,
} from '../../Employee/actions';

import {
  loadStoreListRequest
} from '../../Store/actions';
import {
  makeSelectEmployeeList,
} from '../../Employee/selectors';
import { makeSelectStoreList } from '../../Store/selectors';

class WorkingDayInput extends React.Component {
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
    const { workingDayList } = this.props;
    const workingId = this.props.match.params.id;
    const { employeeList, storeList } = this.props;
    const startTimeNow = new Date();
    startTimeNow.setHours(4, 30);
    const endTimeNow = new Date();
    endTimeNow.setHours(9, 30);
    if (workingId && workingDayList.length) {
      const currentWorkingDay = workingDayList.find(
        workingDay => workingDay.id === workingId,
      );
      // const { birthday, firstOpenedDate } = currentWorkingDay;
      // currentWorkingDay.birthday = birthday ? moment(birthday).format('YYYY-MM-DD') : '';
      // currentWorkingDay.firstOpenedDate = firstOpenedDate ? moment(firstOpenedDate).format('YYYY-MM-DD') : '';
      if (currentWorkingDay) {
        const employee = employeeList.find(em => em.id === currentWorkingDay.employeeId);
        const store = storeList.find(st => st.id === currentWorkingDay.storeId);

        // let employee;
        // let store;
        // if (employeeList) {
        //   employee = employeeList.find(em => em.id === currentWorkingDay.employeeId);
        // }
        // if (storeList) {
        //   store = storeList.find(st => st.id === currentWorkingDay.storeId);
        // }
        const { id, startTime, endTime, note } = currentWorkingDay;
        this.state = {
          openDialog: false,
          mode: UPDATE_EDIT,
          values: {
            id,
            store,
            employee,
            workingDate: new Date(endTime),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            note,
          },
        };
      }
    } else {
      this.state = {
        openDialog: false,
        mode: ADD_NEW,
        values: {
          id: '',
          store: null,
          employee: null,
          workingDate: new Date(),
          startTime: startTimeNow,
          endTime: endTimeNow,
          note: '',
        },
      };
    }

  }

  componentDidMount() {
    // this.props.actions.loadEmployeeListRequest();
    // this.props.actions.loadStoreListRequest();
  }

  handleFormChange = values => this.setState({ values });


  handleFormSubmit = () => {
    const { actions } = this.props;
    // const { values } = this.state;
    const { id, store, employee, workingDate, startTime, endTime, note } = this.state.values;
    let fromDateTime;
    let toDateTime;
    if (startTime instanceof Date) {
      fromDateTime = new Date(startTime.getTime());
      toDateTime = new Date(endTime.getTime());
      fromDateTime.setDate(workingDate.getDate());
      toDateTime.setDate(workingDate.getDate());
    } else {
      fromDateTime = new Date(startTime);
      toDateTime = new Date(endTime);
      const dWorkingDate = new Date(workingDate);
      fromDateTime.setDate(dWorkingDate.getDate());
      toDateTime.setDate(dWorkingDate.getDate());
    }

    const workingDayModel = {
      id,
      storeId: store.id,
      employeeId: employee.id,
      startTime: fromDateTime,
      endTime: toDateTime,
      note,
    };
    (this.state.mode === UPDATE_EDIT)
      ? actions.updateWorkingDayRequest(workingDayModel)
      : actions.saveWorkingDayRequest(workingDayModel);
  }

  handleGoToList = () => this.props.history.push('/working-day/list');

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.props.actions.resetWorkingDaySuccess();
    this.setState({ openDialog: false });
  };

  render() {
    const { values, openDialog } = this.state;
    const { requestError, employeeList, storeList } = this.props;

    return (
      <div>
        {
          employeeList && storeList &&
          <WorkingDayInputForm
            initialValues={values}
            onSubmit={this.handleFormSubmit}
            onChange={this.handleFormChange}
            onCancel={this.handleGoToList}
            employeeList={employeeList}
            storeList={storeList}
            disabled={false}
            busy={false}
        />
        }
        <AlertDialogSlide message={requestError} open={this.state.openDialog && requestError} handleClose={this.handleClose} />
        { openDialog && <AlertDialogSlide message='Successfully Update Database' open handleClose={this.handleClose}/> }
      </div>
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentWorkingDay: makeSelectWorkingDayPerId(),
  workingDayList: makeSelectWorkingDayList(),
  requestError: makeSelectRequestError(),
  requestSuccess: makeSelectRequestSuccess(),
  employeeList: makeSelectEmployeeList(),
  storeList: makeSelectStoreList(),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      saveWorkingDayRequest,
      updateWorkingDayRequest,
      loadWorkingDayPerIdRequest,
      resetWorkingDaySuccess,
      loadEmployeeListRequest,
      loadStoreListRequest,
    },
    dispatch,
  ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

WorkingDayInput.propTypes = {
  actions: PropTypes.object,
  match: PropTypes.object,
  workingDayList: PropTypes.array,
  employeeList: PropTypes.array,
  storeList: PropTypes.array,
};

export default compose(
  withConnect,
  withRouter,
)(WorkingDayInput);
