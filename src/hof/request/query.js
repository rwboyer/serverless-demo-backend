const url = require("url");
const qs = require("querystring");

module.exports = fn => async (req, res) => {
  const query = url.parse(req.url).query;
  req.query = qs.parse(query);

  await fn(req, res);
};
