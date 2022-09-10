import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import classes from "./Test.module.css";

const Test = () => {
  const dispatch = useDispatch();
  const heroesRdx = useSelector((store) => store.heroes);
  const { outputHeroes: heroes, selectedHeroes } = heroesRdx;

  const { selectedHeroesState, setSelectedHeroesState } = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [secondNameState, setSecondNameState] = useState("");

  useEffect(() => {
    // const objNames = heroes[0].children;
    // console.log(objNames);
    // const first = objNames[0];
    // const second = objNames[1];
    // console.log(objNames);
    setFirstNameState(heroes[0].name);
    setSecondNameState(heroes[1].name);
  }, [heroes]);

  const heroClickedHandler = (event) => {
    dispatch(heroesActions.outputTwoHeroes("btnClicked"));
    dispatch(heroesActions.selectHero(event.target.id));
  };

  return (
    <div>
      {" "}
      <div className={classes.herodivleft}>
        <h1>First Hero (number)</h1>
        <h1>{firstNameState}</h1>
        <button id={firstNameState} onClick={heroClickedHandler}>
          Pick Hero
        </button>
      </div>
      <div className={classes.herodivright}>
        <h1>Second Hero (number)</h1>
        <h1>{secondNameState}</h1>
        <button id={secondNameState} onClick={heroClickedHandler}>
          Pick Hero
        </button>
      </div>
      <h1>Picked Heroes (number): {selectedHeroes}</h1>
    </div>
  );
};

export default Test;
