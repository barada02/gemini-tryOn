
import React from 'react';
import { UserImage } from '../types';
import { UserIcon } from './icons/UserIcon';

interface HeaderProps {
    userImage: UserImage | null;
    onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ userImage, onReset }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gemini Virtual Try-On
        </h1>
        <div className="flex items-center space-x-4">
          {userImage && (
            <button 
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            >
              Change Photo
            </button>
          )}
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {userImage ? (
              <img src={`data:${userImage.mimeType};base64,${userImage.base64}`} alt="User" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
