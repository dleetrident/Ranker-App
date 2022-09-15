const HeroDetails = (props) => {
  console.log(props.powers);
  return (
    <div>
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
