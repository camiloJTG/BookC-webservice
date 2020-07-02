"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerFile = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = _multer["default"].diskStorage({
  destination: (0, _path.join)(__dirname, '../public/images'),
  filename: function filename(req, file, cb, _filename) {
    cb(null, "".concat((0, _uuid.v4)()).concat((0, _path.extname)(file.originalname)));
  }
});

var multerFile = function multerFile() {
  return (0, _multer["default"])({
    storage: store
  }).single('image');
};

exports.multerFile = multerFile;