const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const pdfRouter = express.Router();
const pdfController = require('../Controllers/pdfController');
pdfRouter.post('/ViewPdfLinks', upload.single('file'), pdfController.ViewPdfLinks);
module.exports = pdfRouter;