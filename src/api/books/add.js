const { compose } = require("lodash/fp");
const useBody = require("../../hof/request/body-parser");
const useSendStatus = require("../../hof/response/send-status");
const useTime = require("../../hof/time/log");
const useSQL = require("../../hof/request/sql");

const fn = async (req, res) => {
  const book = req.body;

  await req.db.insert(book).into("books");
  return res.sendStatus(201);
};

module.exports = compose(
  useTime("add book"),
  useBody,
  useSendStatus,
  useSQL()
)(fn);
