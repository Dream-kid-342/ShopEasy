import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import Card from '@/components/ui/Card';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/Button';

const { width } = Dimensions.get('window');
const bannerHeight = width * 0.4;

export default function HomeScreen() {
  const router = useRouter();
  const { featuredProducts, categories } = useProducts();
  
  const navigateToCategory = (category) => {
    router.push({
      pathname: '/products',
      params: { category }
    });
  };
  
  const navigateToAllProducts = () => {
    router.push('/products');
  };
  
  const navigateToSearch = () => {
    router.push('/search');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Summer Sale</Text>
          <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
          <Button 
            title="Shop Now" 
            onPress={navigateToAllProducts} 
            style={styles.bannerButton}
          />
        </View>
      </View>
      
      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToSearch}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#00BFA5" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.filter(c => c !== 'All').map((category) => (
            <TouchableOpacity 
              key={category}
              style={styles.categoryItem}
              onPress={() => navigateToCategory(category)}
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryIconText}>{category.charAt(0)}</Text>
              </View>
              <Text style={styles.categoryName}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToAllProducts}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#00BFA5" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}
        >
          {featuredProducts.map((product) => (
            <View key={product.id} style={styles.horizontalProductCard}>
              <ProductCard product={product} />
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* Limited Time Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Limited Time Offers</Text>
        
        <Card style={styles.offerCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.offerImage}
          />
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Special Discount</Text>
            <Text style={styles.offerSubtitle}>Get 30% off on selected electronics</Text>
            <Button 
              title="View Offer" 
              size="small"
              onPress={() => navigateToCategory('Electronics')} 
            />
          </View>
        </Card>
      </View>
      
      {/* New Arrivals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={navigateToAllProducts}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#00BFA5" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.gridContainer}>
          {featuredProducts.slice(0, 4).map((product) => (
            <View key={product.id} style={styles.gridProductCard}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  bannerContainer: {
    height: bannerHeight,
    position: 'relative',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
  },
  bannerButton: {
    minWidth: 120,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#00BFA5',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00796B',
  },
  categoryName: {
    fontSize: 14,
    color: '#212121',
    textAlign: 'center',
  },
  productsContainer: {
    paddingVertical: 8,
  },
  horizontalProductCard: {
    width: 180,
    marginRight: 16,
  },
  offerCard: {
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 0,
    height: 120,
  },
  offerImage: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  offerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridProductCard: {
    width: '50%',
    padding: 8,
  },
});