import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import Card from "../UI/Card";

const RankComplete = () => {
  const scoreList = useSelector((store) => store.heroes.heroesList);
  const ratingList = useSelector((store) => store.heroes.ratingList);
  console.log(ratingList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(heroesActions.sortListByRating(scoreList));
    // const sendList = ratingList.map((hero) => {
    //   return {
    //     ...hero,
    //     score: 0,
    //   };
    // });

    dispatch(heroesActions.sendData(scoreList));
  }, [dispatch, scoreList, ratingList]);
  console.log(ratingList, scoreList);
  return (
    <Card>
      <h1>Completed List</h1>
      <ul>
        {scoreList.map((hero) => (
          <li key={hero.id}>
            Name: {hero.name} - Score: {hero.score}
          </li>
        ))}
      </ul>
      <p> VS </p>
      <ul>
        {ratingList.map((hero) => (
          <li key={hero.id}>
            Name: {hero.name} - Score: {hero.rating}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RankComplete;
