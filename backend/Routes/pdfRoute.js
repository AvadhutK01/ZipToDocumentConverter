const express = require('express');
const pdfRouter = express.Router();
const pdfController = require('../Controllers/pdfController');
const authenticateUser = require('../MiddleWares/auth');
pdfRouter.get('/ViewPdfLinks', authenticateUser, pdfController.viewPdfLinks);
module.exports = pdfRouter;