const { flow } = require("lodash");
const useBody = require("../../hof/request/body-parser");
const useSendStatus = require("../../hof/response/send-status");
const useTime = require("../../hof/time/log");
const waitFor = require("../../hof/time/sleep");

// mock users
const users = require("../../mocks/users");

const fn = async (req, res) => {
  users.push(req.body);
  return res.sendStatus(200);
};

module.exports = flow(
  useTime,
  waitFor(3000),
  useBody,
  useSendStatus
)(fn);
