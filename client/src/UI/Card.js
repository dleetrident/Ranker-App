import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.cardrow}>{props.children}</div>;
};

export default Card;
