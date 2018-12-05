import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withFormValidation, hasErrors, isEmailAddressValid } from 'components/ValidatedFormHOC';

import messages from '../../messages';

const styles = (theme) => ({
  button: {
    padding: '1em 0',
    margin: '1em 0 .75em 0',
  },
  headerText: {
    marginBottom: theme.spacing.unit,
  },
});

const EmployeeInput = ({ intl, classes, onSubmit, onChange, values, disabled, busy, errors, onBlur, onSubmitFocus }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        required
        error={hasErrors(errors.email)}
        helperText={hasErrors(errors.email) ? errors.email : null}
        id="email"
        label={intl.formatMessage(messages.email)}
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        margin="normal"
        placeholder={intl.formatMessage(messages.email_placeholder)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        disabled={disabled || busy}
      />

      <TextField
        required
        error={hasErrors(errors.password)}
        helperText={hasErrors(errors.password) ? errors.password : null}
        id="password"
        label={intl.formatMessage(messages.password)}
        type="password"
        value={values.password}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        autoComplete="current-password"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        margin="normal"
        fullWidth
        disabled={disabled || busy}
      />

      {/* TODO: @rob, Add button spinner on busy prop */}
      <Button
        type="submit"
        variant="raised"
        color="secondary"
        fullWidth
        className={classes.button}
        onClick={onSubmit}
        onFocus={onSubmitFocus}
        disabled={disabled || busy}
      >
        {intl.formatMessage(messages.login)}
      </Button>
    </form>
  );
};

EmployeeInput.propTypes = {
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
};

EmployeeInput.defaultProps = {
  busy: false,
  disabled: false,
  onBlur: () => null,
  onSubmitFocus: () => null,
  errors: {},
};

export default injectIntl(compose(
  withFormValidation(isLoginFieldValid, ['email', 'password']),
  withStyles(styles)
)(EmployeeInput));

// TODO: Use i18n strings here.
function isLoginFieldValid(name, values) {
  switch (name) {
    case 'email':
      if (values[name].length < 1) {
        return ['You must enter an email address'];
      }

      if (!isEmailAddressValid(values[name])) {
        return ['Please enter a valid email address'];
      }

      return [];
    case 'password':
      if (values[name].length < 1) {
        return ['You must enter a password'];
      }

      return [];

    default:
      return [];
  }
}
