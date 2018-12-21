const { compose } = require("lodash/fp");
const useQuery = require("../../hof/request/query");
const useSend = require("../../hof/response/send");
const useTime = require("../../hof/time/log");
const useNoSQL = require("../../hof/request/mongo");

const fn = async (req, res) => {
  const query = req.query;
  const movies = await req.mongo.movies.find(query);

  return res.send(movies);
};

module.exports = compose(
  useTime("find movie"),
  useSend,
  useQuery,
  useNoSQL()
)(fn);
