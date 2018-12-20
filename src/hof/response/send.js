module.exports = fn => async (req, res) => {
  res.send = obj => res.end(JSON.stringify(obj));
  return fn(req, res);
};
