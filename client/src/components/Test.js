import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import RankComplete from "./RankComplete";
import classes from "./Test.module.css";

const Test = () => {
  const dispatch = useDispatch();
  const heroesRdx = useSelector((store) => store.heroes);
  const { outputHeroes: heroes, selectedHeroes, listComplete } = heroesRdx;

  // const { selectedHeroesState, setSelectedHeroesState } = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [firstId, setFirstId] = useState("");
  const [secondNameState, setSecondNameState] = useState("");
  const [secondId, setSecondId] = useState("");

  useEffect(() => {
    // const objNames = heroes[0].children;
    // console.log(objNames);
    // const first = objNames[0];
    // const second = objNames[1];
    // console.log(objNames);
    setFirstNameState(heroes[0].name);
    setFirstId(heroes[0].id);
    setSecondNameState(heroes[1].name);
    setSecondId(heroes[1].id);
  }, [heroes]);

  const heroClickedHandler = (event) => {
    dispatch(heroesActions.selectHero(event.target.id));
    dispatch(heroesActions.outputTwoHeroes("btnClicked"));
  };

  return (
    <section>
      {listComplete ? (
        <RankComplete />
      ) : (
        <div>
          {" "}
          <div className={classes.herodivleft}>
            <h1>First Hero (number)</h1>
            <h1>{firstNameState}</h1>
            <button id={firstId} onClick={heroClickedHandler}>
              Pick Hero
            </button>
          </div>
          <div className={classes.herodivright}>
            <h1>Second Hero (number)</h1>
            <h1>{secondNameState}</h1>
            <button id={secondId} onClick={heroClickedHandler}>
              Pick Hero
            </button>
          </div>
          {/* <div className={classes.heroList}>
        {" "}
        <h1>Picked Heroes (number): {selectedHeroes}</h1>
      </div> */}
        </div>
      )}
    </section>
  );
};

export default Test;
