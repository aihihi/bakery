import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';
import ReactSelect from 'components/ReactSelect';
import { Creatable } from "react-select";
import { withFormValidation, hasErrors} from 'components/ValidatedFormHOC';

// import messages from '../../messages';

const styles = (theme) => ({
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '1em 0',
    margin: '1em 1em .75em 0',
    width: 150,
  },
  headerText: {
    marginBottom: theme.spacing.unit,
  },
});

const nowDate = () => new Date();

const StoreInputForm = ({ intl, classes, onEmployeeChange, employeesPerStore, onSubmit, onChange, onCancel, values, disabled, busy, errors, onBlur, onSubmitFocus, employeeList, }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        required
        error={hasErrors(errors.name)}
        helperText={hasErrors(errors.name) ? errors.name : null}
        id="name"
        label="Store Name"
        value={values.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        margin="normal"
        placeholder="Please enter Name"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        disabled={disabled || busy}
      />
      <ReactSelect
        multi
        options={employeeList}
        handleChange={onEmployeeChange}
        selectedValues={employeesPerStore}
        valueField="id"
        labelField="fullName"
        title="Employees"
        placeHolder="Select multiple employees"
      />
      <TextField
        id="Address"
        label="Address"
        value={values.address}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('address')}
        onBlur={handleBlur('address')}
        placeholder="Please enter Address"
        margin="normal"
        fullWidth
        disabled={disabled || busy}
      />

      <TextField
        id="firstOpenedDate"
        label="First Opened Date"
        type="date"
        value={values.firstOpenedDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('firstOpenedDate')}
        onBlur={handleBlur('firstOpenedDate')}
        placeholder="Please enter First Opened Date"
        margin="normal"
        fullWidth
        disabled={disabled || busy}
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
  );
};

StoreInputForm.propTypes = {
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

StoreInputForm.defaultProps = {
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
)(StoreInputForm);

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
