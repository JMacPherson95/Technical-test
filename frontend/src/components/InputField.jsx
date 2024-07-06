import classes from '../../src/styles/Input.module.css';

function InputField({ label, id, error, ...props }) {
  return (
    <div className={classes.inputLayout}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label}
      </label>
      <input id={id} {...props} />
      {error}
    </div>
  );
}

export default InputField;
