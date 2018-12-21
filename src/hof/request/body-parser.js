const { json } = require("micro");

module.exports = fn => async (req, res) => {
  req.body = await json(req);

  await fn(req, res);
};
