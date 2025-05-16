import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FileSliders as Slider, FileSliders as Sliders, Check, X } from 'lucide-react-native';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { categories, priceBrackets, sortOptions } from '@/data/products';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 600;

const ProductFilter = ({ 
  onApplyFilters, 
  initialFilters = {}, 
  visible = false, 
  onClose 
}) => {
  const [filters, setFilters] = useState({
    search: initialFilters.search || '',
    category: initialFilters.category || 'All',
    priceRange: initialFilters.priceRange || null,
    sortBy: initialFilters.sortBy || 'newest',
    brands: initialFilters.brands || [],
    inStock: initialFilters.inStock || false,
    onSale: initialFilters.onSale || false,
  });

  const handleSearchChange = (text) => {
    setFilters(prev => ({ ...prev, search: text }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handlePriceChange = (priceRange) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleToggleInStock = () => {
    setFilters(prev => ({ ...prev, inStock: !prev.inStock }));
  };

  const handleToggleOnSale = () => {
    setFilters(prev => ({ ...prev, onSale: !prev.onSale }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    if (isSmallScreen && onClose) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      priceRange: null,
      sortBy: 'newest',
      brands: [],
      inStock: false,
      onSale: false,
    });
  };

  if (isSmallScreen && !visible) {
    return null;
  }

  return (
    <Card style={[
      styles.container, 
      isSmallScreen && styles.mobileContainer
    ]}>
      {isSmallScreen && (
        <View style={styles.mobileHeader}>
          <Text style={styles.mobileHeaderTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#212121" />
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search</Text>
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChangeText={handleSearchChange}
            leftIcon={<Slider size={20} color="#757575" />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal={isSmallScreen}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  filters.category === category && styles.selectedCategoryButton
                ]}
                onPress={() => handleCategoryChange(category)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    filters.category === category && styles.selectedCategoryButtonText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            {priceBrackets.map((bracket) => (
              <TouchableOpacity
                key={bracket.label}
                style={[
                  styles.priceButton,
                  filters.priceRange === bracket && styles.selectedPriceButton
                ]}
                onPress={() => handlePriceChange(bracket)}
              >
                <Text 
                  style={[
                    styles.priceButtonText,
                    filters.priceRange === bracket && styles.selectedPriceButtonText
                  ]}
                >
                  {bracket.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          <ScrollView 
            horizontal={isSmallScreen}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortContainer}
          >
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortButton,
                  filters.sortBy === option.value && styles.selectedSortButton
                ]}
                onPress={() => handleSortChange(option.value)}
              >
                <Text 
                  style={[
                    styles.sortButtonText,
                    filters.sortBy === option.value && styles.selectedSortButtonText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityContainer}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={handleToggleInStock}
            >
              <View style={[
                styles.checkbox,
                filters.inStock && styles.checkedCheckbox
              ]}>
                {filters.inStock && <Check size={16} color="white" />}
              </View>
              <Text style={styles.checkboxLabel}>In Stock Only</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={handleToggleOnSale}
            >
              <View style={[
                styles.checkbox,
                filters.onSale && styles.checkedCheckbox
              ]}>
                {filters.onSale && <Check size={16} color="white" />}
              </View>
              <Text style={styles.checkboxLabel}>On Sale</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Reset Filters"
          variant="outline"
          onPress={handleResetFilters}
          style={styles.resetButton}
        />
        <Button
          title="Apply Filters"
          onPress={handleApplyFilters}
          style={styles.applyButton}
          icon={<Sliders size={16} color="white" />}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width < 600 ? '100%' : 280,
    height: width < 600 ? '90%' : 'auto',
    position: width < 600 ? 'absolute' : 'relative',
    zIndex: width < 600 ? 1000 : 1,
    top: width < 600 ? '5%' : 0,
    left: width < 600 ? 0 : 0,
    right: width < 600 ? 0 : 0,
    bottom: width < 600 ? 0 : 0,
    marginHorizontal: width < 600 ? 'auto' : 0,
  },
  mobileContainer: {
    borderRadius: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 16,
  },
  mobileHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212121',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: width < 600 ? 'nowrap' : 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
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
  priceRangeContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  priceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  selectedPriceButton: {
    backgroundColor: '#E0F2F1',
    borderColor: '#00BFA5',
  },
  priceButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  selectedPriceButtonText: {
    color: '#00796B',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: width < 600 ? 'nowrap' : 'wrap',
    gap: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSortButton: {
    backgroundColor: '#E0F2F1',
    borderColor: '#00BFA5',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#757575',
  },
  selectedSortButtonText: {
    color: '#00796B',
  },
  availabilityContainer: {
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#00BFA5',
    borderColor: '#00BFA5',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#212121',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
});

export default ProductFilter;