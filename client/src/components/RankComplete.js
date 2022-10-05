import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import Card from "../UI/Card";
import classes from "./RankComplete.module.css";

const RankComplete = () => {
  const scoreList = useSelector((store) => store.heroes.heroesList);
  const ratingList = useSelector((store) => store.heroes.ratingList);
  console.log(ratingList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(heroesActions.sortListByRating(scoreList));
    // establish former rating

    dispatch(heroesActions.sendData(scoreList));
  }, [dispatch, scoreList, ratingList]);
  console.log(ratingList, scoreList);
  return (
    <Card>
      <h1>Completed List</h1>
      <div className={classes.container}>
        <ol>
          {scoreList.map((hero) => (
            <li key={hero.id}>
              {hero.name} <br /> <b>Your Score: </b> {hero.score}{" "}
              <b>New Rating: </b>
              {hero.rating}
            </li>
          ))}
        </ol>
        <p> VS </p>
        <ol>
          {ratingList.map((hero) => (
            <li key={hero.id}>
              {hero.name} <br /> <b>Old Rating: </b> {hero.rating}
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
};

export default RankComplete;
