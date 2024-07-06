import classes from '../styles/HomePage.module.css';
import { APP_IMAGES } from '../images';
import AppInfo from '../components/AppInfo';

function HomePage() {
  return (
    <>
      <h1 className={classes.title}>Welcome!</h1>
      <h3 className={classes.title}>This project was built with...</h3>
      <section className={classes.box}>
        <ul className={classes.container}>
          {APP_IMAGES.map((appImage) => (
            <AppInfo key={appImage.title} {...appImage} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default HomePage;
