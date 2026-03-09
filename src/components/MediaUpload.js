import React, { useState } from 'react';
import { uploadImageToCloudinary, uploadVideoToCloudinary } from '../utils/cloudinary';

const MediaUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileUpload = async (file, type) => {
    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      let result;
      if (type === 'image') {
        result = await uploadImageToCloudinary(file);
      } else if (type === 'video') {
        result = await uploadVideoToCloudinary(file);
      }

      setUploadProgress(100);
      onUploadSuccess?.(result, type);
    } catch (err) {
      setError(`Failed to upload ${type}: ${err.message}`);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      if (type === 'image') {
        return file.type.startsWith('image/');
      } else if (type === 'video') {
        return file.type.startsWith('video/');
      }
      return false;
    });

    validFiles.forEach(file => handleFileUpload(file, type));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Upload to Cloudinary
      </h2>

      {/* Image Upload Area */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Upload Images</h3>
        <div
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onDrop={(e) => handleDrop(e, 'image')}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('imageInput').click()}
        >
          <input
            id="imageInput"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              files.forEach(file => handleFileUpload(file, 'image'));
            }}
          />
          <div className="text-blue-600">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">Drop images here or click to browse</p>
            <p className="text-sm text-blue-500 mt-2">Supports: JPG, PNG, GIF, WebP</p>
          </div>
        </div>
      </div>

      {/* Video Upload Area */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Upload Videos</h3>
        <div
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onDrop={(e) => handleDrop(e, 'video')}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('videoInput').click()}
        >
          <input
            id="videoInput"
            type="file"
            multiple
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              files.forEach(file => handleFileUpload(file, 'video'));
            }}
          />
          <div className="text-blue-600">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium">Drop videos here or click to browse</p>
            <p className="text-sm text-blue-500 mt-2">Supports: MP4, MOV, AVI, WebM</p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Uploading...</span>
            <span className="text-sm text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {uploadProgress === 100 && !error && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Upload successful! Your media will appear in the gallery.
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
