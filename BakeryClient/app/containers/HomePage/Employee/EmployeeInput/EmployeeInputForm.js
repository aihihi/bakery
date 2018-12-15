import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';

import { withFormValidation, hasErrors} from 'components/ValidatedFormHOC';

// import messages from '../../messages';

const styles = (theme) => ({
  button: {
    padding: '1em 0',
    margin: '1em 0 .75em 0',
  },
  headerText: {
    marginBottom: theme.spacing.unit,
  },
});

const nowDate = () => new Date();

const EmployeeInputForm = ({ intl, classes, onSubmit, onChange, onCancel, values, disabled, busy, errors, onBlur, onSubmitFocus }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        required
        error={hasErrors(errors.fullName)}
        helperText={hasErrors(errors.fullName) ? errors.fullName : null}
        id="fullName"
        label="Full Name"
        value={values.fullName}
        onChange={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        margin="normal"
        placeholder="Please enter Full Name"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        disabled={disabled || busy}
      />

      <TextField
        required
        type="number"
        error={hasErrors(errors.mobilePhone)}
        helperText={hasErrors(errors.mobilePhone) ? errors.mobilePhone : null}
        id="mobilePhone"
        label="Mobile Phone"
        value={values.mobilePhone}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('mobilePhone')}
        onBlur={handleBlur('mobilePhone')}
        placeholder="Please enter Mobile Phone"
        margin="normal"
        fullWidth
        disabled={disabled || busy}
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
        id="birthday"
        label="Birthday"
        type="date"
        value={values.birthday}
        // defaultValue={''}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('birthday')}
        placeholder="Please enter Birthday"
        margin="normal"
        fullWidth
        disabled={disabled || busy}
      />
      <TextField
        id="joinedDate"
        label="Joined Date"
        type="date"
        value={values.joinedDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('joinedDate')}
        onBlur={handleBlur('joinedDate')}
        placeholder="Please enter Joined Date"
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
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
        fullWidth
        className={classes.button}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

EmployeeInputForm.propTypes = {
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

EmployeeInputForm.defaultProps = {
  busy: false,
  disabled: false,
  onBlur: () => null,
  onSubmitFocus: () => null,
  errors: {},
};

export default compose(
  withRouter,
  withFormValidation(isLoginFieldValid, ['fullName', 'mobilePhone']),
  withStyles(styles)
)(EmployeeInputForm);

// TODO: Use i18n strings here.
function isLoginFieldValid(name, values) {
  switch (name) {
    case 'fullName':
      if (values[name].length < 1) {
        return ['You must enter Full Name'];
      }

      return [];
    case 'mobilePhone':
      if (values[name].length < 1) {
        return ['You must enter a mobilePhone'];
      }

      return [];

    default:
      return [];
  }
}
