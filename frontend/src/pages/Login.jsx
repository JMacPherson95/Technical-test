/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/authSlice.js';

import classes from '../styles/Form.module.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import loginUser from '../helpers/loginHelper.js';

function Login() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/landing');
    }
  }, [loggedIn, navigate]);

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid = didEdit.password && !enteredValues.password;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!enteredValues.email.trim() || !enteredValues.password.trim()) {
      setFormIsInvalid(true);
      return;
    }

    setFormIsInvalid(false);

    try {
      await loginUser(enteredValues);
      dispatch(loginSuccess());
      setErrorMessage('');
      navigate('/landing');
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
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.options}>
          <div className={classes.formContainer}>
            <h2 className={classes.title}>Login</h2>
            {formIsInvalid && <p>Please enter valid details.</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <InputField
              label="email"
              id="email"
              type="email"
              name="email"
              onBlur={() => handleInputBlur('email')}
              className={classes.inputField}
              placeholder="email"
              onChange={(event) =>
                handleInputChange('email', event.target.value)
              }
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
              onBlur={() => handleInputBlur('password')}
              className={classes.inputField}
              placeholder="password"
              onChange={(event) =>
                handleInputChange('password', event.target.value)
              }
              value={enteredValues.password || ''}
              error={
                passwordIsInvalid && (
                  <p className={classes.inputError}>
                    Please enter your password.
                  </p>
                )
              }
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button>Login</Button>
          </div>
          <Link to="/register" className={classes.registerLink}>
            Don't have an account? Register here.
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;
