import { createSlice, current } from "@reduxjs/toolkit";

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroesList: [],
    listProgress: 0,
    outputHeroes: [],
    selectedHeroes: [],
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
        state.heroesList.sort((a, b) => {
          return b.score - a.score;
        });
        state.heroesList.map((hero) => {
          hero.rating = hero.rating + hero.score;
        });
        state.listComplete = true;
        // sendRatingData(state.heroesList);
      }

      const index = state.listProgress;
      state.outputHeroes = state.heroesList.slice(index, index + 2);
    },
    sendData(state, action) {
      sendRatingData(action.payload);
    },
    selectHero(state, action) {
      state.selectedHeroes.push(action.payload);
      const selectedHero = state.heroesList.map((hero) => {
        if (hero.id === action.payload) {
          return (hero.score = hero.score + 1);
        }
      });
      console.log(selectedHero);
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
