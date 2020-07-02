"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = exports.generateHash = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var generateSalt = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var salt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].genSalt(10);

          case 2:
            salt = _context.sent;
            return _context.abrupt("return", salt.toString());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateSalt() {
    return _ref.apply(this, arguments);
  };
}();

var generateHash = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password) {
    var salt, hash;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return generateSalt();

          case 2:
            salt = _context2.sent;
            _context2.next = 5;
            return _bcrypt["default"].hash(password, salt);

          case 5:
            hash = _context2.sent;
            return _context2.abrupt("return", hash);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function generateHash(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.generateHash = generateHash;

var compare = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(textPlanePassword, hashPassword) {
    var compare;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _bcrypt["default"].compare(textPlanePassword, hashPassword);

          case 2:
            compare = _context3.sent;
            return _context3.abrupt("return", compare);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function compare(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.compare = compare;