
import React, { useState } from 'react';
import { Product, UserImage } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import UserImageUploader from './components/UserImageUploader';
import ProductGrid from './components/ProductGrid';
import TryOnPanel from './components/TryOnPanel';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<UserImage | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleImageUpload = (image: UserImage) => {
    setUserImage(image);
  };

  const handleTryOn = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePanel = () => {
    setSelectedProduct(null);
  };
  
  const handleReset = () => {
    setUserImage(null);
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 antialiased">
      <Header userImage={userImage} onReset={handleReset} />
      <main className="container mx-auto px-4 py-8">
        {!userImage ? (
          <UserImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <ProductGrid products={PRODUCTS} onTryOn={handleTryOn} />
        )}
      </main>
      {selectedProduct && userImage && (
        <TryOnPanel
          userImage={userImage}
          product={selectedProduct}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

export default App;
