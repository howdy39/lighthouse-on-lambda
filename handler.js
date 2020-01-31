const lighthouse = require('./lighthouse');
const send2gas= require('./send2gas');

module.exports.audit = async () => {
  const opts = {
    disableCpuThrottling: true,
    disableNetworkThrottling: true
  }
  console.log('TARGET_URL', process.env.TARGET_URL);
  return await lighthouse.getLighthouseScore(process.env.TARGET_URL, opts).then(score => {
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