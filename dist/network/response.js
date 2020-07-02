"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.success = void 0;

var success = function success(req, res, message, status) {
  var statusCode = status || 200;
  var statusMessage = message || '';
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage
  });
};

exports.success = success;

var error = function error(req, res, message, status) {
  var statusCode = status || 500;
  var statusMessage = message || 'Internal Server Error. Please, try again later';
  res.status(status).send({
    error: true,
    status: statusCode,
    body: statusMessage
  });
};

exports.error = error;