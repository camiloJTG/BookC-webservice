"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = void 0;

var _bcrypt = require("../../utils/bcrypt");

var _store = require("../../database/firebase/store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var TABLE = 'users';

var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _store.get)(id.id, TABLE);

          case 2:
            result = _context.sent;

            if (result) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              info: 'User not found',
              status: 404
            });

          case 5:
            if (result.data) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", {
              info: 'User not found',
              status: 404
            });

          case 7:
            return _context.abrupt("return", {
              info: result,
              status: 200
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
    var emailExist, hashPassword, newUser, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!user.email || !user.password || !user.username)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", {
              info: 'The email, password and username field needed to create the user were not found',
              status: 422
            });

          case 2:
            _context2.next = 4;
            return (0, _store.getByParameter)(TABLE, user.email, 'email');

          case 4:
            emailExist = _context2.sent;

            if (!(emailExist.length !== 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", {
              info: "The email ".concat(user.email, " is already registred. Please, try again with another mail"),
              status: 428
            });

          case 7:
            _context2.next = 9;
            return (0, _bcrypt.generateHash)(user.password);

          case 9:
            hashPassword = _context2.sent;
            // Creating user object
            newUser = {
              username: user.username,
              password: hashPassword,
              email: user.email,
              createdAt: Date.now(),
              updatedAt: Date.now()
            };
            _context2.next = 13;
            return (0, _store.create)('users', newUser);

          case 13:
            result = _context2.sent;
            return _context2.abrupt("return", {
              info: result,
              status: 201
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _store.remove)(id.id, TABLE);

          case 2:
            result = _context3.sent;

            if (result) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {
              info: 'User not found',
              status: 404
            });

          case 5:
            return _context3.abrupt("return", {
              info: 'User deleted',
              status: 200
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, user) {
    var currentUser, emailExist, usernameExist, hashPassword;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (id.id) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", {
              info: 'The user id was not found in the database',
              status: 404
            });

          case 2:
            _context4.next = 4;
            return (0, _store.get)(id.id, TABLE);

          case 4:
            currentUser = _context4.sent;

            if (currentUser.data) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", {
              info: 'The user you want to update is not in the database',
              status: 404
            });

          case 7:
            if (!user.email) {
              _context4.next = 13;
              break;
            }

            _context4.next = 10;
            return (0, _store.getByParameter)(TABLE, user.email, 'email');

          case 10:
            emailExist = _context4.sent;

            if (!(emailExist.length !== 0)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", {
              info: "The email ".concat(user.email, " is already registred. Please, try again with another mail"),
              status: 428
            });

          case 13:
            if (!user.username) {
              _context4.next = 19;
              break;
            }

            _context4.next = 16;
            return (0, _store.getByParameter)(TABLE, user.username, 'username');

          case 16:
            usernameExist = _context4.sent;

            if (!(usernameExist.length !== 0)) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", {
              info: "The username ".concat(user.username, " is already registered. Please, try again with another username"),
              status: 428
            });

          case 19:
            if (!user.password) {
              _context4.next = 24;
              break;
            }

            _context4.next = 22;
            return (0, _bcrypt.generateHash)(user.password);

          case 22:
            hashPassword = _context4.sent;
            user.password = hashPassword;

          case 24:
            if (!(user.username || user.email || user.password)) {
              _context4.next = 29;
              break;
            }

            user = _objectSpread(_objectSpread({}, user), {}, {
              updatedAt: Date.now()
            });
            _context4.next = 28;
            return (0, _store.update)(id.id, TABLE, user);

          case 28:
            return _context4.abrupt("return", {
              info: 'user updated',
              status: 200
            });

          case 29:
            return _context4.abrupt("return", {
              info: 'No data to update',
              status: 422
            });

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUser(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;