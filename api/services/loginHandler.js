const { SECRET, USERNAME, PASSWORD } = process.env;
const SALT_ROUND = process.env.SALT;
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const PASSWORD_NOT_MATCH = "PASSWORD_NOT_MATCH";
const EMPTY_EMAIL_OR_PASSWORD = "EMPTY_EMAIL_OR_PASSWORD";

module.exports = {
  authenticate: function ({ username, password }) {
    if (!username || !password) {
      throw new Error(EMPTY_EMAIL_OR_PASSWORD);
    }
    const match = (password === PASSWORD && username === USERNAME);
    if (!match) {
      throw new Error(PASSWORD_NOT_MATCH);
    }
  },
};
