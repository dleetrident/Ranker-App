import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { heroesActions } from "./store/heroes-slice";

import Test from "./components/Test";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [heroes, setHeroes] = useState(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));

    const fetchHeroes = async () => {
      try {
        const response = await fetch("/heroes");
        const data = await response.json();
        const sendHeroes = data;
        //   Object.entries(data).map((entry) => ({
        //   [entry[0]]: entry[1],
        // }));
        setHeroes(sendHeroes);
      } catch (error) {
        alert(error);
      }
    };
    fetchHeroes();
  }, [dispatch]);

  const startAppHandler = () => {
    dispatch(heroesActions.inputHeroes(heroes));
    dispatch(heroesActions.outputTwoHeroes());
    setStart(true);
  };

  // useEffect(() => {
  //   const sendHeroes = Object.entries(heroes).map((entry) => ({
  //     [entry[0]]: entry[1],
  //   }));
  //   dispatch(heroesActions.fetchHeroes(sendHeroes));
  // }, [dispatch, heroes]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <button onClick={startAppHandler}>START</button>
        {start && <Test />}
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
