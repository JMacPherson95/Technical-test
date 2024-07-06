/* eslint-disable no-unused-vars */
import classes from '../styles/HomePage.module.css';

function AppInfo({ image, title }) {
  return (
    <li className={classes.listItems}>
      <img src={image} alt={title} className={classes.appImages} />
      <h3 className={classes.header}>{title}</h3>
    </li>
  );
}

export default AppInfo;
