
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onTryOn: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onTryOn }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Our Collection</h2>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8 text-center">Select an item to virtually try it on.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} onTryOn={onTryOn} />
        ))}
        </div>
    </div>
  );
};

export default ProductGrid;
