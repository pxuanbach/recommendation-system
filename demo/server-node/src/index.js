import fs from "fs";
import csv from "fast-csv";
import express from "express";
import cors from "cors";
import prepareRatings from "./preparation/ratings";
import prepareMovies from "./preparation/movies";

import { addUserRating } from "./util";
import { softEval } from "./util/common";
import {
  predictWithCfUserBased,
  predictWithCfItemBased,
} from "./recomender/collaborativeFiltering";

import { extractTopMovie, getFilmDetail } from "./util/movies";

var MOVIES_META_DATA = {};
let MOVIES_KEYWORDS = {};
let RATINGS = [];
let LINKS = [];

let moviesMetaDataPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/movies.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromMetaDataFile)
    .on("end", () => resolve(MOVIES_META_DATA))
);

let moviesKeywordsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/keywords.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromKeywordsFile)
    .on("end", () => resolve(MOVIES_KEYWORDS))
);

let ratingsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/ratings_small.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromRatingsFile)
    .on("end", () => resolve(RATINGS))
);

let linksPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/links.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromLinksFile)
    .on("end", () => resolve(LINKS))
);
function fromMetaDataFile(row) {
  MOVIES_META_DATA[row.movieId] = {
    movieId: row.movieId,
    title: row.title,
  };
}

function fromKeywordsFile(row) {
  MOVIES_KEYWORDS[row.id] = {
    keywords: softEval(row.keywords, []),
  };
}

function fromRatingsFile(row) {
  RATINGS.push(row);
}

function fromLinksFile(row) {
  LINKS.push(row);
}

function transformData([moviesMetaData, moviesKeywords, ratings]) {
  const { MOVIES_BY_ID, MOVIES_IN_LIST } = prepareMovies(moviesMetaData);
  return { MOVIES_BY_ID, MOVIES_IN_LIST, ratings };
}
function getMyRatings(userId, listMovives) {
  let myRatings = [
    addUserRating(
      userId,
      "Terminator 3: Rise of the Machines (2003)",
      "5.0",
      listMovives
    ),
    addUserRating(userId, "Jarhead (2005)", "4.0", listMovives),
    addUserRating(
      userId,
      "Back to the Future Part II (1989)",
      "3.0",
      listMovives
    ),
    addUserRating(userId, "Jurassic Park (1993)", "4.0", listMovives),
  ];
  return myRatings;
}

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/predict-item-based/:userId", async function (req, res) {
  const { userId } = req.params;
  const { count } = req.query;
  var { MOVIES_BY_ID, MOVIES_IN_LIST, ratings } = await Promise.all([
    moviesMetaDataPromise,
    moviesKeywordsPromise,
    ratingsPromise,
    linksPromise,
  ]).then(transformData);
  const myRatings = getMyRatings(userId, MOVIES_IN_LIST);
  const { ratingsGroupedByUser, ratingsGroupedByMovie } = prepareRatings([
    ...myRatings,
    ...ratings,
  ]);
  var cfUserBasedRecommendation = predictWithCfItemBased(
    ratingsGroupedByUser,
    ratingsGroupedByMovie,
    userId
  );

  let dataFilter = extractTopMovie(
    cfUserBasedRecommendation,
    MOVIES_BY_ID,
    count || 10
  );

  Promise.all(getFilmDetail(dataFilter)).then((data) => {
    res.send(data);
  });
});

app.use("/api/v1/predict-user-based/:userId", async function (req, res) {
  const { userId } = req.params;
  const { count } = req.query;
  var { MOVIES_BY_ID, MOVIES_IN_LIST, ratings } = await Promise.all([
    moviesMetaDataPromise,
    moviesKeywordsPromise,
    ratingsPromise,
    linksPromise,
  ]).then(transformData);
  const myRatings = getMyRatings(userId, MOVIES_IN_LIST);
  const { ratingsGroupedByUser, ratingsGroupedByMovie } = prepareRatings([
    ...myRatings,
    ...ratings,
  ]);
  var cfUserBasedRecommendation = predictWithCfUserBased(
    ratingsGroupedByUser,
    ratingsGroupedByMovie,
    userId
  );

  let dataFilter = extractTopMovie(
    cfUserBasedRecommendation,
    MOVIES_BY_ID,
    count || 10
  );

  Promise.all(getFilmDetail(dataFilter, LINKS)).then((data) => {
    res.send(data);
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
