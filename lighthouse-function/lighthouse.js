const lighthouse = require('lighthouse');

exports.getLighthouseScore = (url, opts, config) => {
  return lighthouse(url, opts, config).then(results => {
    const categories = results.lhr.categories;
    const score = {
      performance: categories.performance.score * 100,
      accessibility: categories.accessibility.score * 100,
      'best-practices': categories['best-practices'].score * 100,
      seo: categories.seo.score * 100,
      pwa: categories.pwa.score * 100
    }
    return score;
  });
}

