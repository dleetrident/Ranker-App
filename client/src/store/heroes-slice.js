import { createSlice, current } from "@reduxjs/toolkit";
import EloRating from "elo-rating";

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroesList: [],
    listProgress: 0,
    outputHeroes: [],
    listCompletion: 0,
    listComplete: false,
    sendList: [],
    ratingList: [],
  },
  reducers: {
    inputHeroes(state, action) {
      const data = action.payload;
      state.heroesList = action.payload;
      state.ratingList = data;
    },
    outputTwoHeroes(state, action) {
      if (state.listCompletion !== 23) {
        if (state.listProgress === 10 && action.payload === "btnClicked") {
          state.heroesList.sort((a, b) => {
            return b.score - a.score;
          });
          state.listProgress = 0;
          state.listCompletion++;
        } else if (action.payload === "btnClicked") {
          state.listProgress += 2;
          state.listCompletion++;
        } else {
          state.listProgress = 0;
        }
      } else {
        // sort by score before /RankComplete renders
        state.heroesList.sort((a, b) => {
          if (a.score === b.score) {
            return b.rating - a.rating;
          } else {
            return b.score - a.score;
          }
        });
        // state.heroesList.map((hero) => {
        //   hero.rating = hero.rating + hero.score;
        // });
        state.listComplete = true;
        // sendRatingData(state.heroesList);
      }

      const index = state.listProgress;
      state.outputHeroes = state.heroesList.slice(index, index + 2);
    },
    sendData(state, action) {
      sendRatingData(action.payload);
    },
    updateScore(state, action) {
      const winner = action.payload[0];
      console.log(winner);
      // update score
      const selectedHero = state.heroesList.map((hero) => {
        if (hero.id === winner.id) {
          return (hero.score = hero.score + 1);
        }
      });
    },
    updateRating(state, action) {
      const winner = action.payload.winner[0];
      const loser = action.payload.loser[0];
      // update rating

      var result = EloRating.calculate(winner.rating, loser.rating);
      const updateWinner = state.heroesList.map((hero) => {
        if (hero.id === winner.id) {
          return (hero.rating = result.playerRating);
        }
      });
      const updateLoser = state.heroesList.map((hero) => {
        if (hero.id === loser.id) {
          return (hero.rating = result.opponentRating);
        }
      });
      console.log([
        winner.name,
        result.playerRating,
        loser.name,
        result.opponentRating,
      ]);
    },
    sortListByRating(state, action) {
      const heroList = action.payload;
      console.log(heroList);
      state.ratingList = state.ratingList.sort((a, b) => {
        return b.rating - a.rating;
      });

      // console.log(current(state.ratinglist));
    },
  },
});

export const sendRatingData = (heroesList) => {
  console.log(heroesList);
  const sendData = heroesList.map((hero) => {
    return {
      ...hero,
      score: 0,
    };
  });
  const sendRequest = async () => {
    const response = await fetch(
      "https://ranker-app-heroes-default-rtdb.europe-west1.firebasedatabase.app/heroes.json",
      {
        method: "PUT",
        body: JSON.stringify(sendData),
      }
    );

    if (!response.ok) {
      throw new Error("Sending Data Failed.");
    }
  };
  try {
    sendRequest();
  } catch (error) {
    alert(error);
  }
};

export const heroesActions = heroesSlice.actions;

export default heroesSlice;
