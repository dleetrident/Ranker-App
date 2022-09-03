import { configureStore } from "@reduxjs/toolkit";
import heroesSlice from "./heroes-slice";

const store = configureStore({
  reducer: { heroes: heroesSlice.reducer },
});

export default store;
