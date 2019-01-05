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
  toTime: {
    marginLeft: 20,
  }
});

const nowDate = () => new Date();

const WorkingDayInputForm = ({ intl, classes, employeeList, onEmployeeChange, onSubmit, onChange, onCancel, values, disabled, busy, errors, onBlur, onSubmitFocus }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleComponentChange = (name) => (value) => onChange(name, value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <ReactSelect

          options={employeeList}
          handleChange={handleComponentChange('employee')}
          selectedValues={values.employee}
          valueField="id"
          labelField="fullName"
          title="Employees"
          placeHolder="Select multiple employees"
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
          value={values.fromTime}
          onChange={handleComponentChange('fromTime')}
        />
        <TimePicker
          id="to-time"
          label="To Time"
          margin="normal"
          value={values.toTime}
          onChange={handleComponentChange('toTime')}
          className={classes.toTime}
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
          // fullWidth
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
          // fullWidth
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
  withFormValidation(isLoginFieldValid, ['name']),
  withStyles(styles),
)(WorkingDayInputForm);

// TODO: Use i18n strings here.
function isLoginFieldValid(name, values) {
  switch (name) {
    case 'name':
      if (values[name].length < 1) {
        return ['You must enter Store Name'];
      }
      return [];
    default:
      return [];
  }
}
