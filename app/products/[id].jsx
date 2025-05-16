import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/ProductCard';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const numericId = parseInt(id, 10);
  const router = useRouter();
  const { getProductById, products, categories } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expandDescription, setExpandDescription] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    const foundProduct = getProductById(numericId);
    setProduct(foundProduct);
    
    if (foundProduct) {
      // Find related products in the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [numericId, products]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleToggleDescription = () => {
    setExpandDescription(!expandDescription);
  };
  
  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product...</Text>
      </View>
    );
  }
  
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.wishlistButton}>
          <Heart size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.productImage} 
            resizeMode="cover" 
          />
          {product.discount > 0 && (
            <Badge 
              label={`${product.discount}% OFF`} 
              variant="danger" 
              style={styles.discountBadge}
            />
          )}
        </View>
        
        <View style={styles.productInfo}>
          <View style={styles.categoryRow}>
            <Badge label={product.category} variant="primary" />
            <Text style={styles.stock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>
          
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <View style={styles.divider} />
            <Text style={styles.reviewCount}>42 Reviews</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
            {product.discount > 0 && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.descriptionHeader}
            onPress={handleToggleDescription}
          >
            <Text style={styles.descriptionTitle}>Description</Text>
            {expandDescription ? (
              <ChevronUp size={20} color="#757575" />
            ) : (
              <ChevronDown size={20} color="#757575" />
            )}
          </TouchableOpacity>
          
          <Text 
            style={[
              styles.description,
              !expandDescription && styles.collapsedDescription
            ]}
            numberOfLines={expandDescription ? undefined : 3}
          >
            {product.description}
          </Text>
          
          {product.colors && product.colors.length > 0 && (
            <View style={styles.colorsContainer}>
              <Text style={styles.colorsTitle}>Available Colors</Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color, index) => (
                  <View key={index} style={styles.colorOption}>
                    <Text style={styles.colorName}>{color}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleDecrement}
                disabled={quantity <= 1}
              >
                <Minus size={20} color={quantity <= 1 ? '#BDBDBD' : '#212121'} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleIncrement}
                disabled={quantity >= product.stock}
              >
                <Plus size={20} color={quantity >= product.stock ? '#BDBDBD' : '#212121'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.relatedProductsContainer}>
          <Text style={styles.relatedTitle}>You Might Also Like</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedProducts}
          >
            {relatedProducts.map((relatedProduct) => (
              <View key={relatedProduct.id} style={styles.relatedProductCard}>
                <ProductCard product={relatedProduct} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${(discountedPrice * quantity).toFixed(2)}</Text>
        </View>
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          style={styles.addToCartButton}
          icon={<ShoppingBag size={20} color="white" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  productInfo: {
    padding: 16,
    backgroundColor: 'white',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stock: {
    fontSize: 14,
    color: '#757575',
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#757575',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00BFA5',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#424242',
    marginBottom: 16,
  },
  collapsedDescription: {
    height: 72, // Approximately 3 lines of text
  },
  colorsContainer: {
    marginBottom: 16,
  },
  colorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  colorName: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityText: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  relatedProductsContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  relatedProducts: {
    paddingBottom: 8,
  },
  relatedProductCard: {
    width: 180,
    marginRight: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#757575',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00BFA5',
  },
  addToCartButton: {
    flex: 1,
    marginLeft: 16,
  },
});