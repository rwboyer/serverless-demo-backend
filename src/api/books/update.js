const { compose } = require("lodash/fp");
const useSendStatus = require("../../hof/response/send-status");
const useTime = require("../../hof/time/log");
const useBody = require("../../hof/request/body-parser");
const useSQL = require("../../hof/request/sql");

const fn = async (req, res) => {
  const book = req.body;

  await req
    .db("books")
    .update(book)
    .where({ id: book.id });

  return res.sendStatus(201);
};

module.exports = compose(
  useTime("update book"),
  useSendStatus,
  useBody,
  useSQL()
)(fn);
