"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authorization = require("../../middleware/authorization");

var _controller = require("./controller");

var _response = require("../../network/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var route = _express["default"].Router(); // GET BOOK


route.get('/', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _controller.readBook)();

          case 3:
            result = _context.sent;

            if (!(result.status === 200)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log("[GET BOOK] - Internal Server Error. Info. ".concat(_context.t0.message));
            return _context.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // GET:ID BOOK

route.get('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _controller.getByIdBook)(req.params);

          case 3:
            result = _context2.sent;

            if (!(result.status === 200)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context2.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log("[GET:ID BOOK] - Internal Server Error. Info. ".concat(_context2.t0.message));
            return _context2.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // GET:ID USER

route.get('/user/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _controller.getByUserId)(req.params);

          case 3:
            result = _context3.sent;

            if (!(result === 200)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context3.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log("[GET:ID USER] - Internal Server Erro. Info. ".concat(_context3.t0.message));
            return _context3.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // POST BOOK

route.post('/', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _controller.createBook)(req.body, req.file);

          case 3:
            result = _context4.sent;

            if (!(result.status === 201)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context4.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.error("[POST BOOK] - Internal Server Error. Info. ".concat(_context4.t0.message));
            return _context4.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // DELETE BOOK

route["delete"]('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _controller.deleteBook)(req.params);

          case 3:
            result = _context5.sent;

            if (!(result.status === 200)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context5.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            console.error("[DELETE BOOK] - Internal Server Error. Info. ".concat(_context5.t0.message));
            return _context5.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // PUT BOOK

route.put('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _controller.updateBook)(req.params, req.body, req.file);

          case 3:
            result = _context6.sent;

            if (!(result.status === 200)) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context6.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            console.error("[PUT BOOK] - Internal Server Error. Info ".concat(_context6.t0.message));
            return _context6.abrupt("return", (0, _response.error)(req, res, null, 400));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = route;
exports["default"] = _default;