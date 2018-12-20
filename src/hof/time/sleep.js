const sleep = require("sleep-promise");

module.exports = (ms = 0) => fn => async (req, res) => {
  await sleep(ms);
  await fn(req, res);
};
