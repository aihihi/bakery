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
  makeSelectEmployeeList,
} from '../../Employee/selectors';

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
    const { id } = this.props.match.params;

    if (id && workingDayList.length) {
      const currentWorkingDay = workingDayList.find(workingDay => (
        workingDay.id === id
      ));
      const { birthday, firstOpenedDate } = currentWorkingDay;
      currentWorkingDay.birthday = birthday ? moment(birthday).format('YYYY-MM-DD') : '';
      currentWorkingDay.firstOpenedDate = firstOpenedDate ? moment(firstOpenedDate).format('YYYY-MM-DD') : '';
      this.state = {
        openDialog: false,
        mode: UPDATE_EDIT,
        values: currentWorkingDay,
      };
    } else {
      this.state = {
        openDialog: false,
        mode: ADD_NEW,
        values: {
          id: '',
          store: null,
          employee: null,
          workingDate: new Date(),
          fromTime: null,
          toTime: null,
          note: '',
        },
      };
    }

  }

  componentDidMount() {
    this.props.actions.loadEmployeeListRequest();
  }

  handleFormChange = values => this.setState({ values });

  handleFormSubmit = () => {
    const { actions } = this.props;
    (this.state.mode === UPDATE_EDIT)
      ? actions.updateWorkingDayRequest(this.state.values)
      : actions.saveWorkingDayRequest(this.state.values);
  }

  handleGoToList = () => this.props.history.push('/workingDay/list');

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.props.actions.resetWorkingDaySuccess();
    this.setState({ openDialog: false });
  };

  handleEmployeeChange = value => {
    // if (value && value.length > 0) {
    //   this.props.actions.setEmployeesPerStore(value);
    // }
  };
  render() {
    const { values, openDialog } = this.state;
    const { requestError, employeeList } = this.props;

    return (
      <div>
        <WorkingDayInputForm
          initialValues={values}
          onSubmit={this.handleFormSubmit}
          onChange={this.handleFormChange}
          onCancel={this.handleGoToList}
          employeeList={employeeList}
          onEmployeeChange={this.handleEmployeeChange}
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
  currentWorkingDay: makeSelectWorkingDayPerId(),
  workingDayList: makeSelectWorkingDayList(),
  requestError: makeSelectRequestError(),
  requestSuccess: makeSelectRequestSuccess(),
  employeeList: makeSelectEmployeeList(),
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      saveWorkingDayRequest,
      updateWorkingDayRequest,
      loadWorkingDayPerIdRequest,
      resetWorkingDaySuccess,
      loadEmployeeListRequest,
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
};

export default compose(
  withConnect,
  withRouter,
)(WorkingDayInput);
