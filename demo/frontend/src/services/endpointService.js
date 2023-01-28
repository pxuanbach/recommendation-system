const prefix = "/api";

const getContentBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/content-based/${param.userId}?num_items=${
    param.numItems || 10
  }`;

const getModelBasedRecommendEndPoint = (param) =>
  `${prefix}/recommend/model-based/${param.userId}?num_items=${
    param.numItems || 10
  }`;


export {
    getContentBasedRecommendEndPoint,
    getModelBasedRecommendEndPoint
}