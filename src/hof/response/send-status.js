module.exports = fn => async (req, res) => {
  res.sendStatus = status => {
    res.statusCode = status;
    res.end();
  };

  await fn(req, res);
};
