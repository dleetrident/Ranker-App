import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import Card from "../UI/Card";
import RankComplete from "./RankComplete";
import classes from "./Test.module.css";

const Test = () => {
  const dispatch = useDispatch();
  const heroesRdx = useSelector((store) => store.heroes);
  const { outputHeroes: heroes, selectedHeroes, listComplete } = heroesRdx;

  // const { selectedHeroesState, setSelectedHeroesState } = useState("");

  const [first, setFirst] = useState({
    id: "",
    image: "",
    link: "",
    name: "",
  });
  const [second, setSecond] = useState({
    id: "",
    image: "",
    link: "",
    name: "",
  });

  useEffect(() => {
    // const objNames = heroes[0].children;
    // console.log(objNames);
    // const first = objNames[0];
    // const second = objNames[1];
    // console.log(objNames);

    setFirst(heroes[0]);
    setSecond(heroes[1]);
  }, [heroes]);

  const heroClickedHandler = (event) => {
    dispatch(heroesActions.selectHero(event.target.id));
    dispatch(heroesActions.outputTwoHeroes("btnClicked"));
  };
  console.log(first, second);
  return (
    <section>
      {listComplete ? (
        <RankComplete />
      ) : (
        <div className={classes.container}>
          {" "}
          <Card>
            <div className={classes.herodivleft}>
              <img
                className={classes.image}
                src={require(`../resources/images/${
                  first.image ? first.image : "Loading.png"
                }`)}
                alt={first.id}
              />

              <h1>{first.name}</h1>
              <button id={first.id} onClick={heroClickedHandler}>
                Pick Hero
              </button>
            </div>
          </Card>
          <Card>
            {" "}
            <div className={classes.herodivright}>
              <img
                className={classes.image}
                src={require(`../resources/images/${
                  second.image ? second.image : "Loading.png"
                }`)}
                alt={second.id}
              />

              <h1>{second.name}</h1>
              <button id={second.id} onClick={heroClickedHandler}>
                Pick Hero
              </button>
            </div>
          </Card>
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
