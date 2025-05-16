import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import Input from '@/components/ui/Input';
import ProductCard from '@/components/ProductCard';

export default function SearchScreen() {
  const { searchProducts, categories } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'headphones', 'smart watch', 'camera'
  ]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setProducts([]);
      return;
    }
    
    const filters = {
      category: selectedCategory
    };
    
    const results = searchProducts(searchQuery, filters);
    setProducts(results);
  }, [searchQuery, selectedCategory]);
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  const handleRecentSearch = (term) => {
    setSearchQuery(term);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const addToRecentSearches = (term) => {
    if (!term.trim() || recentSearches.includes(term)) return;
    
    // Add to the beginning and keep only the last 5
    setRecentSearches([term, ...recentSearches.slice(0, 4)]);
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Input
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          leftIcon={<SearchIcon size={20} color="#757575" />}
          rightIcon={
            searchQuery ? (
              <TouchableOpacity onPress={handleClearSearch}>
                <X size={20} color="#757575" />
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {searchQuery.trim() === '' ? (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
          <View style={styles.recentSearchesList}>
            {recentSearches.map((term, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => handleRecentSearch(term)}
              >
                <SearchIcon size={16} color="#757575" />
                <Text style={styles.recentSearchText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.suggestedTitle}>Popular Categories</Text>
          <View style={styles.suggestedCategoriesContainer}>
            {categories.filter(c => c !== 'All').map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.suggestedCategory}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.suggestedCategoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {products.length} results for "{searchQuery}"
          </Text>
          
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductCard product={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.productGrid}
            ListEmptyComponent={(
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found</Text>
                <Text style={styles.emptySubtext}>Try a different search term</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchBar: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  recentSearchesList: {
    marginBottom: 24,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recentSearchText: {
    fontSize: 16,
    marginLeft: 12,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestedCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestedCategory: {
    backgroundColor: '#E0F2F1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    margin: 4,
  },
  suggestedCategoryText: {
    color: '#00796B',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '500',
    padding: 16,
  },
  productGrid: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
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