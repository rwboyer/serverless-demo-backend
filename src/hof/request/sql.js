const knex = require("knex");

module.exports = (opts = {}) => fn => async (req, res) => {
  const connectionString =
    opts.connectionString || process.env.CONNECTION_STRING;
  const connectionOptions = opts.connectionOptions || {};
  const field = opts.field || "db";

  // read knexfile would be awesome...
  // const db = knex(connectionString, connectionOptions);
  const db = {};

  req[field] = db;

  await fn(req, res);

  db.destroy();
};
