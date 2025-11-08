
import React, { useState, useEffect, useCallback } from 'react';
import { Product, UserImage } from '../types';
import { generateTryOnImage } from '../services/geminiService';
import { CloseIcon } from './icons/CloseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface TryOnPanelProps {
  userImage: UserImage;
  product: Product;
  onClose: () => void;
}

const fetchImageAsBase64 = async (url: string): Promise<UserImage> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error('FileReader did not return a string.'));
            }
            const base64 = reader.result.split(',')[1];
            resolve({ base64, mimeType: blob.type });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const TryOnPanel: React.FC<TryOnPanelProps> = ({ userImage, product, onClose }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
        const productImage = await fetchImageAsBase64(product.imageUrl);
        const resultBase64 = await generateTryOnImage(userImage, productImage, product.name);
        setGeneratedImage(resultBase64);
    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t generate the image. Please try another item.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, userImage]);

  useEffect(() => {
    generateImage();
  }, [generateImage]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-xl h-full bg-white dark:bg-gray-800 shadow-2xl flex flex-col p-6 transform transition-transform duration-300 ease-in-out" 
        onClick={(e) => e.stopPropagation()}
        style={{ transform: 'translateX(0%)' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Virtual Try-On</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
            {isLoading && (
                <div className="text-center">
                    <SpinnerIcon className="w-12 h-12 text-indigo-500 mx-auto animate-spin" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Gemini is creating your new look...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">This can take a moment.</p>
                </div>
            )}
            {error && (
                <div className="text-center p-4">
                    <p className="text-red-500 font-semibold">{error}</p>
                </div>
            )}
            {generatedImage && (
                <img 
                    src={`data:image/png;base64,${generatedImage}`}
                    alt={`User trying on ${product.name}`}
                    className="w-full h-full object-contain"
                />
            )}
        </div>
        <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default TryOnPanel;
