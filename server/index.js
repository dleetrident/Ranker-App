const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!!!" });
});

app.get("/heroes", (req, res) => {
  const options = {
    method: "GET",
    url: "https://ranker-app-heroes-default-rtdb.europe-west1.firebasedatabase.app/heroes.json",
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/heroes", (req, res) => {
  console.log(req.body);
  const options = {
    method: "PUT",
    url: "https://ranker-app-heroes-default-rtdb.europe-west1.firebasedatabase.app/heroes.json",
    body: req.body,
    data: req.body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
