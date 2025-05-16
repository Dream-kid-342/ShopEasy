import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';

// Create context
const ProductContext = createContext();

// Context provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize product state
  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
    
    // Extract unique brands
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    setBrands(uniqueBrands);
    
    // Set featured products
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured);
    
    setLoading(false);
  }, []);

  // Product operations
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id)) + 1
    };
    
    setProducts(prev => [...prev, newProduct]);
    
    // Update categories if new one
    if (!categories.includes(product.category)) {
      setCategories(prev => [...prev, product.category]);
    }
    
    // Update brands if new one
    if (!brands.includes(product.brand)) {
      setBrands(prev => [...prev, product.brand]);
    }
    
    // Update featured products if needed
    if (product.featured) {
      setFeaturedProducts(prev => [...prev, newProduct]);
    }
    
    return newProduct;
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    // Update featured products if needed
    if (updatedProduct.featured) {
      setFeaturedProducts(prev => {
        const exists = prev.some(p => p.id === updatedProduct.id);
        if (exists) {
          return prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        } else {
          return [...prev, updatedProduct];
        }
      });
    } else {
      setFeaturedProducts(prev => prev.filter(p => p.id !== updatedProduct.id));
    }
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    setFeaturedProducts(prev => prev.filter(product => product.id !== productId));
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  const searchProducts = (query, filters = {}) => {
    let filtered = [...products];
    
    // Search query
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filtered = filtered.filter(product => {
        return searchTerms.every(term => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.tags.some(tag => tag.toLowerCase().includes(term))
        );
      });
    }
    
    // Category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    // Price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }
    
    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    // On sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount > 0);
    }
    
    // Brands filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.stock - a.stock);
          break;
        case 'newest':
        default:
          // For demo purposes, just leave them as is
          break;
      }
    }
    
    return filtered;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        brands,
        featuredProducts,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};