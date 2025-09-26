const express = require('express');
const protect = require('../middlewares/authMiddleware');
const multer = require('multer');
const { mergePDFs } = require('../controllers/pdfController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, upload.array('pdfs'), mergePDFs);

module.exports = router;