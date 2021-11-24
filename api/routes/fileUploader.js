const express = require("express");
const Multer = require("multer");
const admin = require("firebase-admin");
const config = require("../validation/config");
const cloudStorageCtrl = require("../controllers/cloud.storage.controller");
const serviceAccount = require("../validation/serviceAccountKey");

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.firebaseStorageBucketURL,
});
var bucket = admin.storage().bucket();

// add admin to ther request params to get into controller zone
router.use(function (req, res, next) {
  if (!req.admin) {
    req.admin = admin;
  }
  if (!req.bucket) {
    req.bucket = bucket;
  }
  next();
});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// URL /upload
router.post("/", multer.single("file"), cloudStorageCtrl.upload);
module.exports = router;
