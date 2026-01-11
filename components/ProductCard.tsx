
import React from 'react';
import { Product, ProductType } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isVerified && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
            <i className="fas fa-check-circle"></i> VERIFIED SELLER
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
          {product.type}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>
        
        {product.specs && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.specs.cpu && (
              <span className="bg-gray-100 text-gray-600 text-[9px] px-1.5 py-0.5 rounded uppercase font-mono border border-gray-200">
                CPU: {product.specs.cpu}
              </span>
            )}
            {product.specs.gpu && (
              <span className="bg-red-50 text-[#e2231a] text-[9px] px-1.5 py-0.5 rounded uppercase font-mono border border-[#e2231a]/20">
                GPU: {product.specs.gpu}
              </span>
            )}
            {product.specs.ram && (
              <span className="bg-gray-100 text-gray-600 text-[9px] px-1.5 py-0.5 rounded uppercase font-mono border border-gray-200">
                RAM: {product.specs.ram}
              </span>
            )}
            {product.specs.storage && (
              <span className="bg-gray-100 text-gray-600 text-[9px] px-1.5 py-0.5 rounded uppercase font-mono border border-gray-200">
                DISK: {product.specs.storage}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3 mt-auto">
          <div className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </div>
          <button className="bg-black text-white text-xs px-3 py-2 rounded font-bold hover:bg-[#e2231a] transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
