"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _response = require("../../network/response");

var _authorization = require("../../middleware/authorization");

var _controller = require("./controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router(); // GET:ID USER


router.get('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _controller.getUser)(req.params);

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
            console.error("[GET:ID USER] - Internal Server Error. Info: ".concat(_context.t0.message));
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
}()); // POST USER

router.post('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _controller.createUser)(req.body);

          case 3:
            result = _context2.sent;

            if (!(result.status === 201)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context2.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.error("[POST USER] - Internal Server Error. INFO. ".concat(_context2.t0.message));
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
}()); // DELETE USER

router["delete"]('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _controller.deleteUser)(req.params);

          case 3:
            result = _context3.sent;

            if (!(result.status === 200)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context3.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.error("[DELETE USER] - Internal Server Error. INFO. ".concat(_context3.t0.message));
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
}()); // PUT USER

router.put('/:id', _authorization.checkAuth, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _controller.updateUser)(req.params, req.body);

          case 3:
            result = _context4.sent;

            if (!(result.status === 200)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", (0, _response.success)(req, res, result.info, result.status));

          case 6:
            return _context4.abrupt("return", (0, _response.error)(req, res, result.info, result.status));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.error("[PUT USER] - Internal Server Error. INFO. ".concat(_context4.t0.message));
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
}());
var _default = router;
exports["default"] = _default;