const jwt = require("jsonwebtoken");
const {
  jwtPrivatekey,
  jwtAlgorithm,
  jwtExpiresIn,
} = require("../configs/env.variables");

exports.signToken = (input) =>
  jwt.sign(input, jwtPrivatekey, {
    algorithm: jwtAlgorithm,
    expiresIn: jwtExpiresIn,
  });

exports.verifyToken = (token) =>
  jwt.verify(token, jwtPrivatekey, { algorithm: jwtAlgorithm });

exports.getToken = (token) => token.split(" ")[1];
