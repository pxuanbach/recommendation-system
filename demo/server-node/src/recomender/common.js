import similarity from "compute-cosine-similarity";

export function sortByScore(recommendation) {
  return recommendation.sort((a, b) => b.score - a.score);
}

export function getCosineSimilarityRowVector(matrix, index) {
  return matrix.map((rowRelative, i) => {
    return similarity(matrix[index], matrix[i]);
  });
}
