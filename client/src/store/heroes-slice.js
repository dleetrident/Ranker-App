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
  },
  reducers: {
    inputHeroes(state, action) {
      state.heroesList = action.payload;
      console.log(state.heroesList);
    },
    outputTwoHeroes(state, action) {
      if (state.listCompletion !== 23) {
        if (state.listProgress === 10 && action.payload === "btnClicked") {
          state.heroesList.sort((a, b) => {
            return b.rating - a.rating;
          });
          state.listProgress = 0;
          state.listCompletion++;
          console.log("===6");
        } else if (action.payload === "btnClicked") {
          state.listProgress += 2;
          state.listCompletion++;
          console.log("+=2");
        } else {
          state.listProgress = 0;
        }
      } else {
        state.heroesList.sort((a, b) => {
          return b.rating - a.rating;
        });
        state.listComplete = true;
      }

      const index = state.listProgress;
      state.outputHeroes = state.heroesList.slice(index, index + 2);
      console.log(state.outputHeroes, current(state.heroesList));
    },
    selectHero(state, action) {
      state.selectedHeroes.push(action.payload);
      const selectedHero = state.heroesList.map((hero) => {
        if (hero.id === action.payload) {
          return (hero.rating = hero.rating + 1);
        }
      });
      console.log(selectedHero);
      console.log(current(state.heroesList));
    },
  },
});

export const heroesActions = heroesSlice.actions;

export default heroesSlice;
