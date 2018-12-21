const { compose } = require("lodash/fp");
const useQuery = require("../../hof/request/query");
const useSend = require("../../hof/response/send");
const useTime = require("../../hof/time/log");
const useSQL = require("../../hof/request/sql");

const fn = async (req, res) => {
  const query = req.query;
  const books = await req.db
    .select("books.title", "authors.name as author")
    .from("books")
    .join("authors", "authors.id", "books.author_id")
    .where(query);

  return res.send(books);
};

module.exports = compose(
  useTime("find book"),
  useSend,
  useQuery,
  useSQL()
)(fn);
