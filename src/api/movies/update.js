const { compose } = require("lodash/fp");
const useSendStatus = require("../../hof/response/send-status");
const useTime = require("../../hof/time/log");
const useBody = require("../../hof/request/body-parser");
const useNoSQL = require("../../hof/request/mongo");

const fn = async (req, res) => {
  const book = req.body;

  await req.mongo.movies.update(book.id, book);

  return res.sendStatus(201);
};

module.exports = compose(
  useTime("update movie"),
  useSendStatus,
  useBody,
  useNoSQL()
)(fn);
