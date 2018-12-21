const { compose } = require("lodash/fp");
const useJson = require("../../hof/response/json");
const useQuery = require("../../hof/request/query");
const useTime = require("../../hof/time/log");
const useSendStatus = require("../../hof/response/send-status");

// mock users
const users = require("../../mocks/users");

const wrapper = compose(
  useTime("find user"),
  useJson,
  useSendStatus,
  useQuery
);

module.exports = wrapper(async (req, res) => {
  const id = (req.query && req.query.id) || null;
  if (!id) return res.json(users);

  const user = users.find(user => user.index == id);
  if (!user) return res.sendStatus(404);

  return res.json(user);
});
