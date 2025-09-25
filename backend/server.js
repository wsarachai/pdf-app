require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const cors = require('cors');
const fs = require('fs');

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post('/pdfapp/api/v1/merge', upload.array('pdfs'), async (req, res) => {
  const mergedPdf = await PDFDocument.create();

  for (const file of req.files) {
    const pdf = await PDFDocument.load(file.buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(mergedPdfBytes));
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred while processing your request.' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

