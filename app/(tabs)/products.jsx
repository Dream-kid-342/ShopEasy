import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';

const { width } = Dimensions.get('window');

export default function ProductsScreen() {
  const { category } = useLocalSearchParams();
  const { searchProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: category || 'All',
    search: '',
    priceRange: null,
    sortBy: 'newest',
    brands: [],
    inStock: false,
    onSale: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);
  
  useEffect(() => {
    const filteredProducts = searchProducts('', filters);
    setProducts(filteredProducts);
  }, [filters]);
  
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {filters.category === 'All' ? 'All Products' : filters.category}
        </Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleFilters}
        >
          <Filter size={20} color="#212121" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {width >= 600 && (
          <View style={styles.filtersColumn}>
            <ProductFilter 
              onApplyFilters={handleApplyFilters}
              initialFilters={filters}
            />
          </View>
        )}
        
        <View style={styles.productsColumn}>
          {products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ProductCard product={item} />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={width < 600 ? 2 : 3}
              contentContainerStyle={styles.productGrid}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </View>
      
      {width < 600 && (
        <ProductFilter 
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
          visible={showFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: width >= 600 ? 'row' : 'column',
  },
  filtersColumn: {
    width: 280,
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
  },
  productsColumn: {
    flex: 1,
  },
  productGrid: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#757575',
  },
});