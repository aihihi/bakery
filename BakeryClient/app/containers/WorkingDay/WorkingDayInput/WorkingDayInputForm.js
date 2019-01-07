import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import ReactSelect from 'components/ReactSelect';

import { withFormValidation, hasErrors} from 'components/ValidatedFormHOC';

// import messages from '../../messages';

const styles = (theme) => ({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    padding: '1em 0',
    margin: '1em 1em .75em 0',
  },
  headerText: {
    marginBottom: theme.spacing.unit,
  },
  endTime: {
    marginLeft: 20,
  }
});

const nowDate = () => new Date();

const WorkingDayInputForm = ({ intl, classes, employeeList, storeList, onSubmit, onChange, onCancel, values, disabled, busy, errors, onBlur, onSubmitFocus }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleComponentChange = (name) => (value) => onChange(name, value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <ReactSelect
          error={hasErrors(errors.employee)}
          helperText={hasErrors(errors.employee) ? errors.employee : null}
          options={employeeList}
          handleChange={handleComponentChange('employee')}
          selectedValues={values.employee}
          valueField="id"
          labelField="fullName"
          title="Employee"
          placeHolder="Select Employees"
        />
        <ReactSelect
          error={hasErrors(errors.store)}
          helperText={hasErrors(errors.store) ? errors.store : null}
          options={storeList}
          handleChange={handleComponentChange('store')}
          selectedValues={values.store}
          valueField="id"
          labelField="name"
          title="Store"
          placeHolder="Select Store"
        />
        <DatePicker
          margin="normal"
          label="Date picker"
          value={values.workingDate}
          onChange={handleComponentChange('workingDate')}
          format="dd/MM/yyyy"
          fullWidth
        />
        <TimePicker
          id="from-time"
          label="From Time"
          margin="normal"
          value={values.startTime}
          onChange={handleComponentChange('startTime')}
        />
        <TimePicker
          id="to-time"
          label="To Time"
          margin="normal"
          value={values.endTime}
          onChange={handleComponentChange('endTime')}
          className={classes.endTime}
        />
        <TextField
          id="note"
          label="Note"
          value={values.note}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('note')}
          onBlur={handleBlur('note')}
          placeholder="Please enter Note"
          margin="normal"
          fullWidth
          disabled={disabled || busy}
        />
         <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
            onFocus={onSubmitFocus}
            disabled={disabled || busy}
          >
            Save
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </MuiPickersUtilsProvider>
  );
};

WorkingDayInputForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  busy: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  onBlur: PropTypes.func,
  onSubmitFocus: PropTypes.func,
  onCancel: PropTypes.func,
  employeeList: PropTypes.array,
  storeList: PropTypes.array,
};

WorkingDayInputForm.defaultProps = {
  busy: false,
  disabled: false,
  onBlur: () => null,
  onSubmitFocus: () => null,
  errors: {},
};

export default compose(
  withRouter,
  withFormValidation(isLoginFieldValid, ['store', 'employee']),
  withStyles(styles),
)(WorkingDayInputForm);

// TODO: Use i18n strings here.
function isLoginFieldValid(name, values) {
  switch (name) {
    case 'store':
      if (!values[name]) {
        return ['You must enter Store'];
      }
      return [];
    case 'employee':
      if (!values[name]) {
        return ['You must enter Employee'];
      }
      return [];
    default:
      return [];
  }
}
