import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { ShoppingCart, Heart } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';

const { width } = Dimensions.get('window');
const cardWidth = width < 600 ? (width - 48) / 2 : (width - 80) / 3;

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const handlePress = () => {
    router.push(`/products/${product.id}`);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist(product);
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={handlePress}
      style={styles.cardContainer}
    >
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.discount > 0 && (
            <Badge 
              label={`${product.discount}% OFF`} 
              variant="danger" 
              style={styles.discountBadge}
            />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.discount > 0 && (
              <Text style={styles.originalPrice}>
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </Text>
            )}
          </View>
          <Text style={styles.brand}>{product.brand}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <Text style={styles.stock}>{product.stock} left</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cartButton} 
              onPress={handleAddToCart}
            >
              <ShoppingCart size={16} color="#00BFA5" />
              <Text style={styles.cartButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.wishlistButton} 
              onPress={handleAddToWishlist}
            >
              <Heart size={16} color="#757575" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    margin: 8,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BFA5',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  brand: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#FFC107',
  },
  stock: {
    fontSize: 12,
    color: '#757575',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2F1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  cartButtonText: {
    color: '#00BFA5',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 4,
  },
  wishlistButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
});

export default ProductCard;