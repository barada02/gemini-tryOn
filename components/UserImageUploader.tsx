
import React, { useState, useCallback } from 'react';
import { UserImage } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface UserImageUploaderProps {
  onImageUpload: (image: UserImage) => void;
}

const UserImageUploader: React.FC<UserImageUploaderProps> = ({ onImageUpload }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (e.g., JPEG, PNG).');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        onImageUpload({ base64: base64String, mimeType: file.type });
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to the Virtual Try-On Room!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Upload a clear, full-body photo of yourself to get started.
      </p>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <label
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </label>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default UserImageUploader;
