"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = exports.verify = exports.sign = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = process.env.JWT_SECRET_KEY;

var sign = function sign(payload) {
  var token = _jsonwebtoken["default"].sign(payload, secret, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60
  });

  return token;
};

exports.sign = sign;

var verify = function verify(token) {
  var result = _jsonwebtoken["default"].verify(token, secret);

  return result;
};

exports.verify = verify;

var decode = function decode(token) {
  var result = _jsonwebtoken["default"].decode(token);

  return result;
};

exports.decode = decode;