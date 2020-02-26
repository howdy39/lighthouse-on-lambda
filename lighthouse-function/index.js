const lighthouse = require('./lighthouse');
const log = require('lighthouse-logger');
const chromeLauncher = require('chrome-launcher');
const send2gas= require('./send2gas');

let chromePath = undefined;

console.log('process.env.IS_LOCAL', process.env.IS_LOCAL);
// this lets us support invoke local
if (!process.env.IS_LOCAL) {
  chromePath = '/opt/bin/chromium';

  // https://github.com/alixaxel/chrome-aws-lambda/blob/3779715fdc197a245af662725977133b2d676bf9/source/index.js#L6
  // required for node10 support - makes sure fonts and shared libraries are loaded correctly
  if (process.env.FONTCONFIG_PATH === undefined) {
    process.env.FONTCONFIG_PATH = '/opt/lib';
  }

  if (
    process.env.LD_LIBRARY_PATH &&
    process.env.LD_LIBRARY_PATH.startsWith('/opt/lib:') !== true
  ) {
    process.env.LD_LIBRARY_PATH = [
      ...new Set(['/opt/lib', ...process.env.LD_LIBRARY_PATH.split(':')]),
    ].join(':');
  }
}

const chromeFlags = [
  '--headless',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--no-zygote',
  '--no-sandbox',
  '--single-process',
  '--hide-scrollbars',
];

// utility function to run lighthouse
const runLighthouse = async (url) => {
  let chrome = null;
  try {
    console.log('chromeFlags', chromeFlags);
    console.log('chromePath', chromePath);
    chrome = await chromeLauncher.launch({ chromeFlags, chromePath });

    const options = {
      port: chrome.port,
      logLevel: 'info',
    };

    log.setLevel(options.logLevel);

    console.log('url', url);
    console.log('options', options);
    const results = await lighthouse.getLighthouseScore(url, options)
    return results;
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
};

exports.handler = async () => {
  console.log('TARGET_URL', process.env.TARGET_URL);
  return await runLighthouse(process.env.TARGET_URL).then(score => {
    console.log('score', score);
    console.log('WEBHOOK_URL', process.env.WEBHOOK_URL);
    return send2gas.run(process.env.WEBHOOK_URL, score);
  }).then(() => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    }
  });
 }
