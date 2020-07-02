"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCredential = exports.update = exports.remove = exports.create = exports.getByParameter = exports.get = exports.read = void 0;

var _connection = require("./connection");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var read = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(table) {
    var result, collectionData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _connection.db.collection(table).orderBy('createdAt', 'desc').get();

          case 2:
            result = _context.sent;
            collectionData = [];
            result.forEach(function (docs) {
              var data = {
                id: docs.id,
                data: docs.data()
              };
              collectionData.push(data);
            });
            return _context.abrupt("return", collectionData);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function read(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.read = read;

var get = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, table) {
    var result, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _connection.db.collection(table).doc(id).get();

          case 2:
            result = _context2.sent;
            user = {
              id: result.id,
              data: result.data()
            };
            return _context2.abrupt("return", user);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function get(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var getByParameter = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(table, value, field) {
    var result, collectionData;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _connection.db.collection(table).where(field, '==', value).get();

          case 2:
            result = _context3.sent;
            collectionData = [];
            result.forEach(function (docs) {
              var data = {
                id: docs.id,
                data: docs.data()
              };
              collectionData.push(data);
            });
            return _context3.abrupt("return", collectionData);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getByParameter(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getByParameter = getByParameter;

var create = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(table, data) {
    var result, dataResponse;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _connection.db.collection(table).add(data);

          case 2:
            result = _context4.sent;
            _context4.next = 5;
            return result.get();

          case 5:
            dataResponse = _context4.sent;
            return _context4.abrupt("return", {
              id: dataResponse.id,
              data: dataResponse.data()
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function create(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.create = create;

var remove = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, table) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _connection.db.collection(table).doc(id)["delete"]();

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function remove(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.remove = remove;

var update = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, table, data) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _connection.db.collection(table).doc(id).update(data);

          case 2:
            result = _context6.sent;
            return _context6.abrupt("return", result);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function update(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var getCredential = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(email, table) {
    var result, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _connection.db.collection(table).where('email', '==', email).get();

          case 2:
            result = _context7.sent;
            result.forEach(function (docs) {
              user = {
                id: docs.id,
                data: docs.data()
              };
            });
            return _context7.abrupt("return", user);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getCredential(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getCredential = getCredential;