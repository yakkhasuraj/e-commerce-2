const argon2 = require("argon2");

exports.hash = (input) =>
  argon2.hash(input, { type: argon2.argon2d, hashLength: 50 });
