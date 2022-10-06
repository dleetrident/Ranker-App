import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heroesActions } from "../store/heroes-slice";
import Card from "../UI/Card";
import Table from "../UI/Table";
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
    <div className={classes.parentdiv}>
      <Card>
        <h1>Result</h1>
        <div className={classes.container}>
          <div className={classes.table}>
            {" "}
            <Table
              headings={[
                "Old Rank   ",
                "Image",
                "Name",
                "Old Rating",
                "",
                "New Rating",
              ]}>
              <br />
              {ratingList.map((hero, index) => (
                <tr key={hero.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <img
                      className={classes.heroImage}
                      src={require(`../resources/images/${hero.image}`)}
                      alt="VS"
                    />
                  </td>
                  <td>{hero.name}</td>
                  <td>{hero.rating}</td>
                  <td>&rarr;</td>
                  <td>
                    {
                      scoreList.find(
                        (ratingListHero) => hero.id === ratingListHero.id
                      ).rating
                    }
                  </td>
                </tr>
              ))}
            </Table>
          </div>

          <h1 className={classes.arrow}>&rarr;</h1>
          <div className={classes.table}>
            {" "}
            <Table
              headings={[
                "Your Rank   ",
                "Image",
                "Name",
                "Your Score",
                "",
                "New Rating",
              ]}>
              <br />
              {scoreList.map((hero, index) => (
                <tr key={hero.id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <img
                      className={classes.heroImage}
                      src={require(`../resources/images/${hero.image}`)}
                      alt="VS"
                    />
                  </td>
                  <td>{hero.name}</td>
                  <td>{hero.score}</td>
                  <td>&rarr;</td>
                  <td>{hero.rating}</td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RankComplete;
