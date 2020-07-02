"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBook = exports.deleteBook = exports.createBook = exports.getByUserId = exports.getByIdBook = exports.readBook = void 0;

var _store = require("../../database/firebase/store");

var _cloudinary = require("../../utils/cloudinary");

var _fsExtra = require("fs-extra");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var TABLE = 'books';

var readBook = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _store.read)(TABLE);

          case 2:
            result = _context.sent;

            if (!(result.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              info: 'There are not registered books on the platform',
              status: 404
            });

          case 5:
            return _context.abrupt("return", {
              info: result,
              status: 200
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readBook() {
    return _ref.apply(this, arguments);
  };
}();

exports.readBook = readBook;

var getByIdBook = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _store.get)(id.id, TABLE);

          case 2:
            result = _context2.sent;

            if (result) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", {
              info: 'Book not found',
              status: 404
            });

          case 5:
            if (result.data) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", {
              info: 'Book not found',
              status: 404
            });

          case 7:
            return _context2.abrupt("return", {
              info: result,
              status: 200
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getByIdBook(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getByIdBook = getByIdBook;

var getByUserId = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _store.getByParameter)(TABLE, id.id, 'userId');

          case 2:
            result = _context3.sent;

            if (!(result.length === 0)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", {
              info: 'The user id entered does not have any books currently registered',
              status: 404
            });

          case 5:
            return _context3.abrupt("return", {
              info: result,
              status: 200
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getByUserId(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getByUserId = getByUserId;

var createBook = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(book, img) {
    var exists, uploadImage, newBook, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (img) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", {
              info: 'The data model is not correct. Please review the API documentation',
              status: 422
            });

          case 2:
            if (!(!book.title || !book.author || !book.editorial || !book.numberPage || !book.synopsis || !book.rating || !book.startReading || !book.endReading || !book.userId)) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return (0, _fsExtra.unlink)(img.path);

          case 5:
            return _context4.abrupt("return", {
              info: 'The data model is not correct. Please review the API documentation',
              status: 422
            });

          case 6:
            // Validate format data
            book.numberPage = parseInt(book.numberPage);
            book.rating = parseInt(book.rating); // Validate if the user id is valid

            _context4.next = 10;
            return (0, _store.get)(book.userId, 'users');

          case 10:
            exists = _context4.sent;

            if (exists.data) {
              _context4.next = 15;
              break;
            }

            _context4.next = 14;
            return (0, _fsExtra.unlink)(img.path);

          case 14:
            return _context4.abrupt("return", {
              info: 'The user id is not registered in the database',
              status: 404
            });

          case 15:
            _context4.next = 17;
            return (0, _cloudinary.uploadFile)(img.path);

          case 17:
            uploadImage = _context4.sent;
            book.image = uploadImage.secure_url; // Creating book object

            newBook = _objectSpread(_objectSpread({}, book), {}, {
              remotePublicId: uploadImage.public_id,
              localPathImg: img.path,
              createdAt: Date.now(),
              updatedAt: Date.now()
            }); // Saved Book

            _context4.next = 22;
            return (0, _store.create)(TABLE, newBook);

          case 22:
            result = _context4.sent;
            return _context4.abrupt("return", {
              info: result,
              status: 201
            });

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createBook(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createBook = createBook;

var deleteBook = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
    var exist, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _store.get)(id.id, TABLE);

          case 2:
            exist = _context5.sent;

            if (exist.data) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", {
              info: 'Book not found',
              status: 404
            });

          case 5:
            _context5.next = 7;
            return (0, _store.remove)(id.id, TABLE);

          case 7:
            result = _context5.sent;

            if (!result) {
              _context5.next = 14;
              break;
            }

            _context5.next = 11;
            return (0, _fsExtra.unlink)(exist.data.localPathimg);

          case 11:
            _context5.next = 13;
            return (0, _cloudinary.deleteFile)(exist.data.remotePublicId);

          case 13:
            return _context5.abrupt("return", {
              info: 'User deleted',
              status: 200
            });

          case 14:
            return _context5.abrupt("return", {
              info: 'User not found',
              status: 404
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteBook(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteBook = deleteBook;

var updateBook = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, book, img) {
    var currentBook, uploadNewImage;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (id.id) {
              _context6.next = 5;
              break;
            }

            if (!img) {
              _context6.next = 4;
              break;
            }

            _context6.next = 4;
            return (0, _fsExtra.unlink)(img.path);

          case 4:
            return _context6.abrupt("return", {
              info: 'The book id was not found in the database',
              status: 404
            });

          case 5:
            _context6.next = 7;
            return (0, _store.get)(id.id, TABLE);

          case 7:
            currentBook = _context6.sent;

            if (currentBook.data) {
              _context6.next = 13;
              break;
            }

            if (!img) {
              _context6.next = 12;
              break;
            }

            _context6.next = 12;
            return (0, _fsExtra.unlink)(img.path);

          case 12:
            return _context6.abrupt("return", {
              info: 'The book you want to update is not in the database',
              status: 404
            });

          case 13:
            if (!img) {
              _context6.next = 22;
              break;
            }

            _context6.next = 16;
            return (0, _cloudinary.deleteFile)(currentBook.data.remotePublicId);

          case 16:
            _context6.next = 18;
            return (0, _fsExtra.unlink)(currentBook.data.localPathimg);

          case 18:
            _context6.next = 20;
            return (0, _cloudinary.uploadFile)(img.path);

          case 20:
            uploadNewImage = _context6.sent;
            book = _objectSpread(_objectSpread({}, book), {}, {
              remotePublicId: uploadNewImage.public_id,
              localPathImg: img.path,
              image: uploadNewImage.secure_url
            });

          case 22:
            if (!(book.title || book.author || book.editorial || book.numberPage || book.synopsis || book.rating || book.startReading || book.endReading || book.userId || img)) {
              _context6.next = 27;
              break;
            }

            book = _objectSpread(_objectSpread({}, book), {}, {
              updatedAt: Date.now()
            });
            _context6.next = 26;
            return (0, _store.update)(id.id, TABLE, book);

          case 26:
            return _context6.abrupt("return", {
              info: 'Book Updated',
              status: 200
            });

          case 27:
            return _context6.abrupt("return", {
              info: 'Not data book',
              status: 422
            });

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateBook(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateBook = updateBook;