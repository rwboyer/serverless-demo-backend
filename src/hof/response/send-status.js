module.exports = fn => async (req, res) => {
  res.sendStatus = status => {
    res.statusCode = status;
    res.end();
  };

  return fn(req, res);
};
