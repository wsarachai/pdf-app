# PDF App

The **PDF App** is a full-stack application designed to merge multiple PDF files into a single document. It consists of two subprojects: a **backend** and a **frontend**, working together to provide a seamless user experience.

---

## Backend Subproject

### Description
The backend is a Node.js-based REST API that handles the merging of PDF files. It provides an endpoint for uploading multiple PDF files, processes them using the `pdf-lib` library, and returns the merged PDF as a downloadable response.

### Key Features
- **REST API Endpoint**:
  - `POST /pdfapp/api/v1/merge`: Accepts multiple PDF files via `multipart/form-data` and returns the merged PDF.
- **File Upload Handling**: Utilizes `multer` for handling file uploads in memory.
- **PDF Merging**: Uses the `pdf-lib` library to merge PDF files efficiently.
- **Error Handling**: Includes middleware to handle invalid files, merge failures, and unexpected errors.
- **Environment Configuration**: Loads environment variables using the `dotenv` library.

### Tech Stack
- Node.js
- Express.js
- `pdf-lib` for PDF manipulation
- `multer` for file uploads
- `dotenv` for environment variable management

---

## Frontend Subproject

### Description
The frontend is a React-based web application built with Next.js. It provides a user-friendly interface for uploading and merging PDF files, integrating seamlessly with the backend API.

### Key Features
- **Drag-and-Drop File Upload**: Allows users to drag and drop PDF files or select them via a file picker.
- **File Validation**: Ensures only valid PDF files are accepted.
- **Merge Button**: Submits the selected files to the backend API for merging.
- **Progress Indicators**: Displays loading indicators during the merge process and error messages for failures.
- **Download Link**: Provides a link to download the merged PDF upon success.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UX/UI**: Clean, intuitive layout with accessible design principles (WCAG compliant).

### Tech Stack
- React.js with Next.js
- Axios for API communication
- CSS Modules for styling
- Modern React features (e.g., hooks like `useState`)

### API Integration
- Communicates with the backend at `https://5a3a23e335ef.ngrok-free.app/pdfapp/api/v1/merge`.

---

## Summary
The **PDF App** backend and frontend work together to provide a robust and user-friendly solution for merging PDF files. The backend handles the heavy lifting of PDF processing, while the frontend ensures a smooth and accessible user experience.