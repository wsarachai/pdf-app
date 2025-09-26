require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth');
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/pdfapp/api/v1/auth', authRoutes);
app.use('/pdfapp/api/v1/user', userRoutes);
app.use('/pdfapp/api/v1/merge', pdfRoutes);

// Add error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PDF_BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

