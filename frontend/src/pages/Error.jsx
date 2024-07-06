import NavBar from '../components/NavBar';
import classes from '../styles/UserDetails.module.css';

function ErrorPage() {
  return (
    <>
      <NavBar />
      <h1 className={classes.title}>An error occured!</h1>
      <p className={classes.details}>Page does not exist</p>
    </>
  );
}

export default ErrorPage;
