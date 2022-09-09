import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { heroesActions } from "./store/heroes-slice";

import Test from "./components/Test";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const [heroes, setHeroes] = React.useState(null);

  React.useEffect(() => {
    dispatch(heroesActions.outputTwoHeroes());
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    fetch("http://localhost:3001/heroes")
      .then((res) => res.json())
      .then((data) => setHeroes(data));
  }, [dispatch, data]);
  console.log(heroes);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!heroes ? "Loading..." : heroes.antman.powers.suit.name}</p>
        <Test />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
