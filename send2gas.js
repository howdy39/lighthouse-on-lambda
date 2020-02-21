const request = require('request-promise');

exports.run = (url, score) => {
  const message = {
    performance: score.performance,
    accessibility: score.accessibility,
    best_practices: score['best-practices'],
    seo: score.seo,
    progressive_web_app: Math.floor((score.pwa))
  };

  const options = {
    uri: url,
    headers: {
      "Content-type": "application/json",
    },
    json: message
  };

  return request.post(options);
}