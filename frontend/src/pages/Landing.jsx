import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { working, surprise } from '../assets/gif.js';
import classes from '../styles/Gifs.module.css';

function Landing() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <section className={classes.sectionContainer}>
        <div className={classes.gifContainer}>
          <img src={working} alt="gif" className={classes.gifs} />
        </div>
        <div className={classes.gifContainer}>
          <img src={surprise} alt="gif" className={classes.gifs} />
        </div>
      </section>
    </>
  );
}

export default Landing;
