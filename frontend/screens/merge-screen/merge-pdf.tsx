"use client";

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MdDelete, MdPictureAsPdf } from 'react-icons/md';
import styles from './merge-pdf.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).filter(
        (file) => file.type === 'application/pdf'
      );

      const uniqueFiles = selectedFiles.filter(
        (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
      );

      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );

    const uniqueFiles = droppedFiles.filter(
      (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
    );

    setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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

    // This is hardcoded for demonstration purposes. In a real application this application
    // should already have the token stored from when the user logged in.
    let token = localStorage.getItem('token');

    if (!token) {
      const response = await axios.post(`${API_URL}/pdfapp/api/v1/auth/login`, {
        email: process.env.NEXT_PUBLIC_AUTH_EMAIL || 'infoitsci@mju.ac.th',
        password: process.env.NEXT_PUBLIC_AUTH_PASSWORD || 'itsci2025'
      });

      if (response.status !== 200) {
        setError('Authentication failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      token = response.data.token;
      if (!token) {
        setError('Authentication failed. No token received.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('token', token);
    }

    try {
      const response = await axios.post(`${API_URL}/pdfapp/api/v1/merge`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
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
      <h1 className={styles.header}>Merge PDF Files</h1>
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag and drop PDF files here, or click to select files.</p>
        <button onClick={() => fileInputRef.current?.click()} className={styles.selectButton}>
          Select Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />
      </div>
      <div className={styles.fileListContainer}>
        {files.length > 0 && (
          <table className={styles.fileTable}>
            <thead>
              <tr>
                <th></th>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className={styles.fileTableRow}>
                  <td className={styles.fileNameCell}>
                    <span className={styles.fileIcon}><MdPictureAsPdf /></span>
                  </td>
                  <td className={`${styles.fileNameCell} ${styles.alignLeft}`}>
                    {file.name}
                  </td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(index)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleMerge} disabled={isLoading} className={styles.mergeButton}>
        {isLoading ? 'Merging...' : 'Merge PDFs'}
      </button>
      {downloadUrl && (
        <a href={downloadUrl} target="_blank" className={styles.downloadLink}>
          View Merged PDF
        </a>
      )}
    </div>
  );
};

export default MergePDF;