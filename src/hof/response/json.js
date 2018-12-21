module.exports = fn => async (req, res) => {
  res.json = obj => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
  };
  await fn(req, res);
};
