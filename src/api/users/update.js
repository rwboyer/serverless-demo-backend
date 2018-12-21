const { compose } = require("lodash/fp");
const useJson = require("../../hof/response/json");
const useTime = require("../../hof/time/log");
const waitFor = require("../../hof/time/sleep");
const useBody = require("../../hof/request/body-parser");
const useSendStatus = require("../../hof/response/send-status");

// mock users
const users = require("../../mocks/users");

const wrapper = compose(
  useTime("update user"),
  useSendStatus,
  waitFor(1000),
  useJson,
  useBody
);

module.exports = wrapper(async (req, res) => {
  const updateUser = req.body;

  const index = users.findIndex(user => user.index === updateUser.index);
  if (index < 0) return res.sendStatus(204);

  users.splice(index, 1, updateUser);

  return res.sendStatus(202);
});
