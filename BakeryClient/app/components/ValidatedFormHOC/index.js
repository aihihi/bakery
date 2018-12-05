import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const hasErrors = (e) => e !== null && !!e.length;
export const hasNoErrors = (e) => e === null || !e.length;
const isFormValid = (state) => Object.values(state.validatedOnce).every((v) => v)
  && Object.values(state.errors).every(hasNoErrors);

/**
 * Form Validation HOC compatible with compose
 *
 * NOTE: Warning this logic is delicate. Don't screw with it unless you fully understand
 * the UX flow requirements for field validation.
 *
 * @param  {function} validateFieldFn(name, value)     Callback function for validate a field. Returns an error.
 * @param  {array} fields                              String list of field names
 *
 */

export const withFormValidation = (validateFieldFn, fields) => (WrappedComponent) =>
  class WithFormValidation extends Component {
    static propTypes = {
      initialValues: PropTypes.object,
      onSubmit: PropTypes.func.isRequired,
      onChange: PropTypes.func,
    };

    static defaultProps = {
      initialValues: {},
      onChange: () => null,
    };

    static displayName = `withFormValidation(${WrappedComponent.displayName || WrappedComponent.name})`;

    constructor(props) {
      super(props);
      const values = { ...props.initialValues }; // Make sure all non validated fields are included
      const errors = {};
      const validatedOnce = {};

      // Can't think of another way right now.
      // forEach based object map
      // Prevalidate initial values and set state accordingly.
      fields.forEach((field) => {
        // Default the field
        values[field] = (props.initialValues[field] !== undefined && props.initialValues[field] !== null)
          ? props.initialValues[field]
          : '';
        errors[field] = props.initialValues[field] ? validateFieldFn(field, props.initialValues) : [];
        // NOTE: validatedOnce could possibly have been an array. Not sure which would be simpler.
        validatedOnce[field] = !!props.initialValues[field];
      });

      this.state = {
        values,
        errors,
        validatedOnce,
      };
    }

    onValueChange = (name, value) => this.setState((prevState) => {
      // Update the value
      const newValues = {
        ...prevState.values,
        [name]: value,
      };

      // Revalidate all fields that have already been validated at least once.
      // This is because we only want to see an error after the user has move off that field.
      const newErrors = { ...prevState.errors };
      fields.forEach((field) => {
        newErrors[field] = prevState.validatedOnce[field] ? validateFieldFn(field, newValues) : prevState.errors[field];
      });

      return {
        values: newValues,
        errors: newErrors,
      };
    }, () => { this.props.onChange(this.state.values); })

    // Re/Validate that field possibly for the first time.
    onInputBlur = (name) => this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: validateFieldFn(name, prevState.values),
      },
      validatedOnce: {
        ...prevState.validatedOnce,
        [name]: true,
      },
    }))

    // Validate everything, collect all the errors.
    // Used for when focusing on or clicking submit.
    validateAll = (callback = () => null) => this.setState((prevState) => {
      const newErrors = { ...prevState.errors };
      const newValidatedOnce = { ...prevState.validatedOnce };

      // forEach based object map
      fields.forEach((field) => {
        newErrors[field] = validateFieldFn(field, prevState.values);
        newValidatedOnce[field] = true;
      });

      return {
        errors: newErrors,
        validatedOnce: newValidatedOnce,
      };
    }, callback)

    handleSubmit = (event) => {
      event.preventDefault();
      // Force validation on every field
      this.validateAll(() => {
        if (!isFormValid(this.state)) {
          return;
        }

        this.props.onSubmit(this.state.values);
      });
    }

    handleSubmitFocus = () => this.validateAll()

    render() {
      return (<WrappedComponent
        {...this.props}
        values={this.state.values}
        errors={this.state.errors}
        onChange={this.onValueChange}
        onBlur={this.onInputBlur}
        onSubmit={this.handleSubmit}
        onSubmitFocus={this.handleSubmitFocus}
      />);
    }
  };

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmailAddressValid = (email) => emailRegEx.test(email);
