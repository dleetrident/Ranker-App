import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import classes from "./Test.module.css";

const Test = () => {
  const dispatch = useDispatch();
  const heroesRdx = useSelector((store) => store.heroes);
  const { outputHeroes: heroes, selectedHeroes } = heroesRdx;
  const first = heroes[0];
  const second = heroes[1];

  const heroClickedHandler = (event) => {
    dispatch(heroesActions.outputTwoHeroes("btnClicked"));
    dispatch(heroesActions.selectHero(event.target.id));
  };

  return (
    <div>
      {" "}
      <div className={classes.herodivleft}>
        <h1>First Hero (number)</h1>
        <h1>{first}</h1>
        <button id={first} onClick={heroClickedHandler}>
          Pick Hero
        </button>
      </div>
      <div className={classes.herodivright}>
        <h1>Second Hero (number)</h1>
        <h1>{second}</h1>
        <button id={second} onClick={heroClickedHandler}>
          Pick Hero
        </button>
      </div>
      <h1>Picked Heroes (number): {selectedHeroes}</h1>
    </div>
  );
};

export default Test;
