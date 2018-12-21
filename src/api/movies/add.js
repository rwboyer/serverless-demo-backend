const { compose } = require("lodash/fp");
const useBody = require("../../hof/request/body-parser");
const useSendStatus = require("../../hof/response/send-status");
const useTime = require("../../hof/time/log");
const useNoSQL = require("../../hof/request/mongo");

const fn = async (req, res) => {
  const book = req.body;

  // req.noSql because in useNoSQL I set field
  await req.noSql.movies.insert(book);
  return res.sendStatus(201);
};

module.exports = compose(
  useTime("add movie"),
  useBody,
  useSendStatus,
  useNoSQL({ field: "noSql" })
)(fn);
