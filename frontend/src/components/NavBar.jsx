import { useState, useEffect } from 'react';
import reactLogo from '../../public/react.svg';
import '../styles/Landing.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../store/authSlice.js';
import { BASE_URL } from '../../config';

import classes from '../styles/NavBar.module.css';

const NavBar = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Logout failed');
      }

      dispatch(logoutSuccess());
      setMessage('Successfully logged out');
      navigate('/');
      setShowMessage(true);
      console.log('Logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      setMessage('Successfully logged in');
      setShowMessage(true);
    }
  }, [loggedIn]);

  return (
    <nav className={classes.navbar}>
      <div className="div-logo">
        <Link to="/home">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <div className={classes.navbarButtons}>
        <Link to="/user-details" className={classes.navbarButton}>
          My Details
        </Link>
        {loggedIn ? (
          <Link onClick={handleLogout} className={classes.navbarButton}>
            Logout
          </Link>
        ) : (
          <Link to="/" className={classes.navbarButton}>
            Login
          </Link>
        )}
        {showMessage && <div className={classes.message}>{message}</div>}
      </div>
    </nav>
  );
};

export default NavBar;
