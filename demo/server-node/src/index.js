import fs from "fs";
import csv from "fast-csv";
import express from "express";
import cors from "cors";
import prepareRatings from "./preparation/ratings";
import prepareMovies from "./preparation/movies";

import axios from "axios";
import {
  predictWithCfUserBased,
  predictWithCfItemBased,
} from "./strategies/collaborativeFiltering";
import { getMovieIndexByTitle } from "./strategies/common";
import { resolve } from "path";



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

console.log("Unloading data from files ... \n");

Promise.all([
  moviesMetaDataPromise,
  moviesKeywordsPromise,
  ratingsPromise,
  linksPromise,
]).then(init);

function init([moviesMetaData, moviesKeywords, ratings]) {
  const { MOVIES_BY_ID, MOVIES_IN_LIST, X } = prepareMovies(
    moviesMetaData,
    moviesKeywords
  );

  let ME_USER_RATINGS = [
    addUserRating(
      ME_USER_ID,
      "Terminator 3: Rise of the Machines (2003)",
      "5.0",
      MOVIES_IN_LIST
    ),
    addUserRating(ME_USER_ID, "Jarhead (2005)", "4.0", MOVIES_IN_LIST),
    addUserRating(
      ME_USER_ID,
      "Back to the Future Part II (1989)",
      "3.0",
      MOVIES_IN_LIST
    ),
    addUserRating(ME_USER_ID, "Jurassic Park (1993)", "4.0", MOVIES_IN_LIST),
  ];

  const { ratingsGroupedByUser, ratingsGroupedByMovie } = prepareRatings([
    ...ME_USER_RATINGS,
    ...ratings,
  ]);

  var cfUserBasedRecommendation = predictWithCfUserBased(
    ratingsGroupedByUser,
    ratingsGroupedByMovie,
    ME_USER_ID
  );

  let dataFilter = sliceAndDice(
    cfUserBasedRecommendation,
    MOVIES_BY_ID,
    10,
    false
  );
  Promise.all(getFilmDetail(dataFilter)).then((data) => {
    return data;
  });
  const cfItemBasedRecommendation = predictWithCfItemBased(
    ratingsGroupedByUser,
    ratingsGroupedByMovie,
    ME_USER_ID
  );

  console.log("(2) Prediction \n");
  //console.log(sliceAndDice(cfItemBasedRecommendation, MOVIES_BY_ID, 10, false));

  console.log("\n");
  console.log("End ...");
}

// Utility

export function addUserRating(userId, searchTitle, rating, MOVIES_IN_LIST) {
  const { id, title } = getMovieIndexByTitle(MOVIES_IN_LIST, searchTitle);

  return {
    userId,
    rating,
    movieId: id,
    title,
  };
}

export function sliceAndDice(recommendations, MOVIES_BY_ID, count, onlyTitle) {
  recommendations = recommendations.filter(
    (recommendation) => MOVIES_BY_ID[recommendation.movieId]
  );

  recommendations = onlyTitle
    ? recommendations.map((mr) => ({
        title: MOVIES_BY_ID[mr.movieId].title,
        score: mr.score,
        posterPath: MOVIES_BY_ID[mr.movieId].posterPath,
      }))
    : recommendations.map((mr) => ({
        movie: MOVIES_BY_ID[mr.movieId],
        score: mr.score,
        posterPath: MOVIES_BY_ID[mr.movieId].posterPath,
      }));

  return recommendations.slice(0, count);
}

export function softEval(string, escape) {
  if (!string) {
    return escape;
  }

  try {
    return eval(string);
  } catch (e) {
    return escape;
  }
}

export function getFilmDetail(movies) {
  console.log("Get Film detail");
  console.log(movies);
  console.log(LINKS);
  return movies.map((movieItem) => {
    const themeId = getThemeByMovieId(movieItem.movie.movieId);

    console.log("Theme Id");
    console.log(themeId);
    return getApiDetailFilm(themeId);
  });
}

export function getThemeByMovieId(movieId) {
  return LINKS.find((link) => {
    return link.movieId == movieId;
  }).tmdbId;
}

async function getApiDetailFilm(themeMovieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${themeMovieId}?api_key=840ea034bc52334a273a5c37067c860b&language=en-US`;
  let res = await axios.get(apiUrl);
  console.log("Api get data");
  const data = res.data;
  let dataRes = {
    overview: data["overview"],
    poster_path: "https://image.tmdb.org/t/p/w500/" + data["poster_path"],
    backdrop_path: "https://image.tmdb.org/t/p/w1280/" + data["backdrop_path"],
    release_date: data["release_date"],
    runtime: data["runtime"],
    original_title: data["original_title"],
    status: data["status"],
    vote_average: data["vote_average"],
    vote_count: data["vote_count"],
    budget: data["budget"],
    tmdb_id: data["id"],
    revenue: data["revenue"],
  };
  return dataRes;
}

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/collaborativeFiltering", function (req, res) {
  let MOVIES_META_DATA = {};
  let MOVIES_KEYWORDS = {};
  let RATINGS = [];
  let LINKS = [];

  let ME_USER_ID = 5;

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
  let data = Promise.all([
    moviesMetaDataPromise,
    moviesKeywordsPromise,
    ratingsPromise,
    linksPromise,
  ]).then(init);
  res.send(data);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
