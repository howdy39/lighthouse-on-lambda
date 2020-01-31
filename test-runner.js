const lighthouse = require('./lighthouse');
const chromeLauncher = require('chrome-launcher');

const send2gas= require('./send2gas');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse.getLighthouseScore(url, opts, config).then(score => {
      return chrome.kill().then(() => score);
    });
  });
}

const TARGET_URL = "https://techthetoaster.stores.jp";
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyMw1wxBBGqYolnrTFTwGIx63DKBQSS-ZKvscZuJTgtthmN1CcI/exec'

const opts = {
  disableCpuThrottling: true,
  disableNetworkThrottling: true,
  chromeFlags: [
    '--show-paint-rects',
    '--window-size=1680x1050',
    '--hide-scrollbars',
    '--ignore-certificate-errors',
    // '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--homedir=/tmp/randompath0',
    // '--single-process',
    '--data-path=/tmp/randompath1',
    '--disk-cache-dir=/tmp/randompath2'
 ]
};

launchChromeAndRunLighthouse(TARGET_URL, opts).then(score => {
  send2gas.run(WEBHOOK_URL, score);
});
