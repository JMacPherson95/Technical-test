/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from '../styles/Form.module.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import registerUser from '../helpers/registerHelper.js';

function Register() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [enteredValues, setEnteredValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const firstNameIsInvalid =
    didEdit.firstName && enteredValues.firstName === '';

  const lastNameIsInvalid = didEdit.lastName && enteredValues.lastName === '';
  const passwordsDoNotMatch =
    didEdit.confirmPassword &&
    enteredValues.password !== enteredValues.confirmPassword;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const emailIsInvalid = didEdit.email && !emailRegex.exec(enteredValues.email);

  // const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid =
    didEdit.password &&
    (!enteredValues.password || enteredValues.password.length < 6);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !enteredValues.firstName.trim() ||
      !enteredValues.lastName.trim() ||
      !enteredValues.email.trim() ||
      !enteredValues.password.trim() ||
      !enteredValues.confirmPassword.trim()
    ) {
      setFormIsInvalid(true);
      return;
    }

    setFormIsInvalid(false);

    try {
      await registerUser(enteredValues);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }

    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.options}>
        <div className={classes.formContainer}>
          <h2 className={classes.title}>Register</h2>
          {errorMessage && <p>{errorMessage}</p>}
          {formIsInvalid && <p>Please enter valid details.</p>}
          <InputField
            label="first name"
            id="first-name"
            type="text"
            name="first-name"
            onBlur={() => handleInputBlur('firstName')}
            className={classes.inputField}
            placeholder="first name"
            onChange={(event) =>
              handleInputChange('firstName', event.target.value)
            }
            value={enteredValues.firstName}
            error={
              firstNameIsInvalid && (
                <p className={classes.inputError}>Please enter a first name.</p>
              )
            }
          />
          <InputField
            label="last name"
            id="last-name"
            type="text"
            name="last-name"
            className={classes.inputField}
            placeholder="last name"
            onBlur={() => handleInputBlur('lastName')}
            onChange={(event) =>
              handleInputChange('lastName', event.target.value)
            }
            value={enteredValues.lastName || ''}
            error={
              lastNameIsInvalid && (
                <p className={classes.inputError}>Please enter a last name.</p>
              )
            }
          />
          <InputField
            label="email"
            id="email"
            type="email"
            name="email"
            className={classes.inputField}
            placeholder="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)}
            value={enteredValues.email}
            error={
              emailIsInvalid && (
                <p className={classes.inputError}>
                  Please enter a valid email address
                </p>
              )
            }
          />
          <InputField
            label="password"
            id="password"
            type="password"
            name="password"
            className={classes.inputField}
            placeholder="password"
            onBlur={() => handleInputBlur('password')}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
            value={enteredValues.password || ''}
            error={
              passwordIsInvalid && (
                <p className={classes.inputError}>
                  Password must be 6 characters long.
                </p>
              )
            }
          />
          <InputField
            label="confirm password"
            id="confirm-password"
            type="password"
            name="confirm-password"
            className={classes.inputField}
            placeholder="confirm password"
            onBlur={() => handleInputBlur('confirmPassword')}
            onChange={(event) =>
              handleInputChange('confirmPassword', event.target.value)
            }
            value={enteredValues.confirmPassword || ''}
            error={
              passwordsDoNotMatch && (
                <p className={classes.inputError}>Passwords must match.</p>
              )
            }
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button>Register</Button>
        </div>
        <Link to="/login" className={classes.registerLink}>
          Already have an account? Login here.
        </Link>
      </div>
    </form>
  );
}

export default Register;
