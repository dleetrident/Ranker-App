import classes from "./HeroDetails.module.css";

const HeroDetails = (props) => {
  return (
    <div className={classes.details}>
      {props.powers.map((power) => (
        <div key={power.id}>
          <h4>{power.name}</h4>
          <p>{power.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroDetails;
