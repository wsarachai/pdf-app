"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from './merge-pdf.module.css';

const API_URL = "http://localhost:5000";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).filter(
        (file) => file.type === 'application/pdf'
      );
      setFiles(selectedFiles);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      setError('Please select at least one PDF file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append('pdfs', file));

    try {
      const response = await axios.post(`${API_URL}/pdfapp/api/v1/merge`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError('Failed to merge PDFs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Merge PDF Files</h1>
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag and drop PDF files here, or click to select files.</p>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleMerge} disabled={isLoading} className={styles.mergeButton}>
        {isLoading ? 'Merging...' : 'Merge PDFs'}
      </button>
      {downloadUrl && (
        <a href={downloadUrl} download="merged.pdf" className={styles.downloadLink}>
          Download Merged PDF
        </a>
      )}
    </div>
  );
};

export default MergePDF;