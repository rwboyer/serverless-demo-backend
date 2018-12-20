module.exports = fn => async (req, res) => {
  const d1 = Date.now();
  await fn(req, res);

  console.log(`Time elapsed: ${Date.now() - d1} ms`);
};
