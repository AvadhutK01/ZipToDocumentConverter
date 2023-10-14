const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const zipRouter = express.Router();
const ZipController = require('../Controllers/ZipController');
zipRouter.post('/ExtractZip', upload.single('file'), ZipController.ExtractZip);
module.exports = zipRouter;