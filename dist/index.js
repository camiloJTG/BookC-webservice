"use strict";

require("@babel/polyfill");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("./network/router"));

var _cors = _interopRequireDefault(require("cors"));

var _path = require("path");

var _multer = require("./middleware/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Middlewares

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _multer.multerFile)());
app.use((0, _cors["default"])()); // Static field

app.use(_express["default"]["static"]((0, _path.join)(__dirname, 'public'))); // Server

var main = function main() {
  app.listen(process.env.PORT || process.env.PORT_SERVER);
  (0, _router["default"])(app);
  console.log("Server on port ".concat(process.env.PORT_SERVER));
};

main();