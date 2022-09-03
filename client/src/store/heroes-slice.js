import { createSlice } from "@reduxjs/toolkit";

const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroesList: [
      "Hulk",
      "Iron Man",
      "Captain America",
      "Spider Man",
      "Scarlet Witch",
      "Dr Strange",
      "Thor",
      "Ant Man",
      "Vision",
      "Black Panther",
      "Captain Marvel",
      "Thanos",
    ],
    listProgress: 0,
    outputHeroes: [],
    selectedHeroes: [],
  },
  reducers: {
    outputTwoHeroes(state, action) {
      if (state.listProgress === 6 && action.payload === "btnClicked") {
        state.listProgress = 0;
        console.log("===6");
      } else if (action.payload === "btnClicked") {
        state.listProgress += 2;
        console.log("+=2");
      } else {
        state.listProgress = 0;
      }
      const heroesList = state.heroesList;
      const index = state.listProgress;
      console.log({ heroesList, index });
      state.outputHeroes = state.heroesList.slice(index, index + 2);
      console.log(state.outputHeroes);
    },
    selectHero(state, action) {
      state.selectedHeroes.push(action.payload);
    },
  },
});

export const heroesActions = heroesSlice.actions;

export default heroesSlice;
