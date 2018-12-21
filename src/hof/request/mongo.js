const mongoist = require("mongoist");

// for this demo, I supose process.env.CONNECTION_STRING is correct
module.exports = (opts = {}) => fn => async (req, res) => {
  const connectionString =
    opts.connectionString || process.env.CONNECTION_STRING;
  const connectionOptions = opts.connectionOptions || {};
  const field = opts.field || "mongo";
  const db = mongoist(connectionString, connectionOptions);

  req[field] = db;

  await fn(req, res);

  db.close();
};
