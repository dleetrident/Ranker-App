import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { heroesActions } from "./store/heroes-slice";

import Test from "./components/Test";
import { useDispatch } from "react-redux";
import Button from "./UI/Button";

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
      {start ? (
        <Test />
      ) : (
        <div className="center">
          <Button onClick={startAppHandler}>START</Button>
        </div>
      )}
    </div>
  );
}

export default App;
