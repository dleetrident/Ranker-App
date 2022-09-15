import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      id={props.id}
      style={{ color: "black", fontWeight: "bold", backgroundColor: "white" }}>
      {props.children}
    </button>
  );
};

export default Button;
