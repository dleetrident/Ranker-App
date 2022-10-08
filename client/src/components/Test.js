import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { heroesActions } from "../store/heroes-slice";
import Button from "../UI/Button";
import Card from "../UI/Card";
import HeroDetails from "./HeroDetails";
import RankComplete from "./RankComplete";
import classes from "./Test.module.css";

const Test = () => {
  const dispatch = useDispatch();
  const heroesRdx = useSelector((store) => store.heroes);
  const { outputHeroes: heroes, listComplete } = heroesRdx;
  const screenWidth = window.innerWidth;

  const [first, setFirst] = useState({
    id: "",
    image: "",
    link: "",
    name: "",
    powers: [],
    rating: "",
  });
  const [second, setSecond] = useState({
    id: "",
    image: "",
    link: "",
    name: "",
    powers: [],
    rating: "",
  });

  useEffect(() => {
    setFirst(heroes[0]);
    setSecond(heroes[1]);
  }, [heroes]);

  // Clicked Elo Handle

  const heroClickedHandler = (event) => {
    const heroesArr = [first, second];
    let clickedId = event.target.id;

    const winner = heroesArr.filter((hero) => {
      return hero.id === clickedId;
    });
    const loser = heroesArr.filter((hero) => {
      return hero.id !== clickedId;
    });
    dispatch(heroesActions.updateScore(winner));
    dispatch(heroesActions.updateRating({ winner: winner, loser: loser }));

    dispatch(heroesActions.outputTwoHeroes("btnClicked"));
  };

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
              <Button id={first.id} onClick={heroClickedHandler}>
                Pick Hero
              </Button>
            </div>
            <HeroDetails
              id={first.id}
              powers={first.powers}
              rating={first.rating}
            />
          </Card>
          <div className={classes.vsdiv}>
            <img
              className={classes.vslogo}
              src={require("../resources/images/vs.png")}
              alt="VS"
            />
          </div>
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
              <Button id={second.id} onClick={heroClickedHandler}>
                Pick Hero
              </Button>
            </div>
            <HeroDetails
              id={second.id}
              powers={second.powers}
              rating={second.rating}
            />
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
