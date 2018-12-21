module.exports = fn => async (req, res) => {
  res.send = obj => res.end(JSON.stringify(obj));
  await fn(req, res);
};
