module.exports = label => fn => async (req, res) => {
  console.log(`Before ${label}`);
  const d1 = Date.now();
  await fn(req, res);

  console.log(`Time elapsed: ${Date.now() - d1} ms`);
  console.log(`After ${label}`);
};
