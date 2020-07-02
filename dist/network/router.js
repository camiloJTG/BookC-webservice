"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _network = _interopRequireDefault(require("../components/user/network"));

var _network2 = _interopRequireDefault(require("../components/auth/network"));

var _network3 = _interopRequireDefault(require("../components/book/network"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = function route(app) {
  app.use('/users', _network["default"]);
  app.use('/auth', _network2["default"]);
  app.use('/books', _network3["default"]);
};

var _default = route;
exports["default"] = _default;