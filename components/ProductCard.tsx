
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onTryOn: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
            <button
            onClick={() => onTryOn(product)}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
            >
            Try On
            </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
