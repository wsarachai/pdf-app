const { PDFDocument } = require('pdf-lib');

exports.mergePDFs = async (req, res, next) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdf = await PDFDocument.load(file.buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(mergedPdfBytes));
  } catch (error) {
    next(error);
  }
};