import classes from "./HeroDetails.module.css";

const HeroDetails = (props) => {
  return (
    <div className={classes.details}>
      {props.powers.map((power) => (
        <div key={power.id}>
          <h3>{power.name}</h3>
          <p>{power.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroDetails;
