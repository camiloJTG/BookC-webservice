"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logIn = void 0;

var _bcrypt = require("../../utils/bcrypt");

var _jwt = require("../../utils/jwt");

var _store = require("../../database/firebase/store");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(access) {
    var result, credentialValid, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!access.email || !access.password)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              info: 'To perform the authentication process you must have the email and password model',
              status: 422
            });

          case 2:
            _context.next = 4;
            return (0, _store.getCredential)(access.email, 'users');

          case 4:
            result = _context.sent;

            if (result) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", {
              info: 'Invalid Credential',
              status: 401
            });

          case 7:
            _context.next = 9;
            return (0, _bcrypt.compare)(access.password, result.data.password);

          case 9:
            credentialValid = _context.sent;

            if (credentialValid) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", {
              info: 'Invalid credential',
              status: 401
            });

          case 12:
            // Generate token
            token = (0, _jwt.sign)({
              email: result.data.email,
              username: result.data.username
            });
            return _context.abrupt("return", {
              info: token,
              status: 200
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logIn(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.logIn = logIn;