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
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '1em 0',
    margin: '1em 0 .75em 0',
  },
  headerText: {
    marginBottom: theme.spacing.unit,
  },
});

const nowDate = () => new Date();

const WorkingDayInputForm = ({ intl, classes, onSubmit, onChange, onCancel, values, disabled, busy, errors, onBlur, onSubmitFocus }) => {
  const handleChange = (name) => (event) => onChange(name, event.target.value);
  const handleBlur = (name) => () => onBlur(name);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
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
