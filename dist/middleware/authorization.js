"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = void 0;

var _jwt = require("../utils/jwt");

var _response = require("../network/response");

var _fsExtra = require("fs-extra");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkAuth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decodedToken, verifyToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['x-access-token'] || '';
            decodedToken = (0, _jwt.decode)(token);

            if (decodedToken) {
              _context.next = 7;
              break;
            }

            if (!req.file) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return (0, _fsExtra.unlink)(req.file.path);

          case 6:
            return _context.abrupt("return", (0, _response.error)(req, res, 'Invalid Token', 401));

          case 7:
            verifyToken = (0, _jwt.verify)(token);

            if (verifyToken) {
              _context.next = 13;
              break;
            }

            if (!req.file) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return (0, _fsExtra.unlink)(req.file.path);

          case 12:
            return _context.abrupt("return", (0, _response.error)(req, res, 'Invalid Token', 401));

          case 13:
            next();

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkAuth = checkAuth;