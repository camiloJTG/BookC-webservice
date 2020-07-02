"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contract = {
  type: process.env.FIREBASE_CONTRACT_TYPE,
  project_id: process.env.FIREBASE_CONTRACT_PROJECT_ID,
  private_key_id: process.env.FIREBASE_CONTRACT_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_CONTRACT_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CONTRACT_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CONTRACT_CLIENT_ID,
  auth_uri: process.env.FIREBASE_CONTRACT_AUTH_URI,
  token_uri: process.env.FIREBASE_CONTRACT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_CONTRACT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CONTRACT_CLIENT_X509_CERT_URL
};

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(contract),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

var db = _firebaseAdmin["default"].firestore();

exports.db = db;