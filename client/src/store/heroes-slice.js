import { createSlice, current } from "@reduxjs/toolkit";
import EloRating from "elo-rating";

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroesList: { groupA: [], groupB: [] },
    groupMatchups: { groupA: [], groupB: [] },
    outputHeroes: [],
    listProgress: { groupA: 0, groupB: 0 },
    stage: "Group A",
    listComplete: false,
    sendList: [],
    ratingList: [],
  },
  reducers: {
    inputHeroes(state, action) {
      // Create initial lists (ratingsList is ranked by rating)
      const data = action.payload;
      state.ratingList = data;

      // Use shuffle function and divide result into two new random group arrays (groupA and groupB)
      const shuffle = (array) => {
        let newArr = array;
        for (let i = newArr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }

        return newArr;
      };

      const shuffledList = shuffle(data);
      console.log(shuffledList);
      const halfway = Math.ceil(shuffledList.length / 2);
      state.heroesList.groupA = shuffledList.slice(0, halfway);
      const gA = shuffledList.slice(0, halfway);
      state.heroesList.groupB = shuffledList.slice(halfway);
      const gB = shuffledList.slice(halfway);
      // Create lists of group matchups
      const matchups = (group) => {
        let array = [];
        for (let i = 0; i < group.length; i++) {
          for (let j = i; j < group.length; j++) {
            if (i !== j) {
              const randomOrder = Math.random();
              randomOrder > 0.5
                ? array.push([group[i], group[j]])
                : array.push([group[j], group[i]]);
            }
          }
        }
        return array;
      };
      let tA = matchups(gA);
      let tB = matchups(gB);
      state.groupMatchups.groupA = shuffle(tA);
      state.groupMatchups.groupB = shuffle(tB);
    },
    outputHeroes(state, action) {
      const matchupA = state.groupMatchups.groupA;
      let progressA = state.listProgress.groupA;
      const matchupB = state.groupMatchups.groupB;
      let progressB = state.listProgress.groupB;
      console.log(matchupA[progressA]);
      if (progressA !== matchupA.length) {
        state.outputHeroes = matchupA[progressA];
        state.listProgress.groupA++;
        console.log(current(state.groupMatchups.groupA));
        return;
      }
      if (progressA === matchupA.length && progressB !== matchupB.length) {
        state.stage = "Group B";
        state.outputHeroes = matchupB[progressB];
        state.listProgress.groupB++;
        return;
      } else {
        state.listComplete = true;
      }

      // if (state.listCompletion !== 23) {
      //   if (state.listProgress === 10 && action.payload === "btnClicked") {
      //     state.heroesList.sort((a, b) => {
      //       return b.score - a.score;
      //     });
      //     state.listProgress = 0;
      //     state.listCompletion++;
      //   } else if (action.payload === "btnClicked") {
      //     state.listProgress += 2;
      //     state.listCompletion++;
      //   } else {
      //     state.listProgress = 0;
      //   }
      // } else {
      //   // sort by rating and score before /RankComplete renders upon listCompletion reaching 23 (24 cycles)
      //   state.heroesList.sort((a, b) => {
      //     if (a.score === b.score) {
      //       return b.rating - a.rating;
      //     } else {
      //       return b.score - a.score;
      //     }
      //   });

      // const index = state.listProgress;
      // state.outputHeroes = state.heroesList.slice(index, index + 2);
    },
    sendData(state, action) {
      sendRatingData(action.payload);
    },
    updateScore(state, action) {
      const winner = action.payload[0];
      console.log(winner);
      // update score
      console.log(current(state.heroesList.groupA));
      state.heroesList.groupA.forEach((hero) => {
        if (hero.id === winner.id) {
          hero.score = hero.score + 1;
        }
      });

      state.heroesList.groupB.forEach((hero) => {
        if (hero.id === winner.id) {
          hero.score = hero.score + 1;
        }
      });
    },
    updateRating(state, action) {
      const winner = action.payload.winner[0];
      const loser = action.payload.loser[0];
      // update rating

      var result = EloRating.calculate(winner.rating, loser.rating);

      state.ratingList.forEach((hero) => {
        if (hero.id === winner.id) {
          hero.rating = result.playerRating;
        }
      });

      state.ratingList.forEach((hero) => {
        if (hero.id === loser.id) {
          hero.rating = result.opponentRating;
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
  const newData = [...heroesList.groupA, ...heroesList.groupB];
  const sendData = newData.map((hero) => {
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
