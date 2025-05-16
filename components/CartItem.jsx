import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, X } from 'lucide-react-native';
import Card from './ui/Card';
import { useCart } from '@/contexts/CartContext';

const CartItem = ({ item }) => {
  const { product, quantity } = item;
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseQuantity(product.id);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.details}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
            <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
              <X size={20} color="#757575" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.brand}>{product.brand}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
            {product.discount > 0 && (
              <Text style={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          <View style={styles.actionsContainer}>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleDecrease}
              >
                <Minus size={16} color="#00BFA5" />
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleIncrease}
                disabled={quantity >= product.stock}
              >
                <Plus size={16} color={quantity >= product.stock ? '#BDBDBD' : '#00BFA5'} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.totalPrice}>
              ${(discountedPrice * quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginBottom: 4,
  },
  removeButton: {
    padding: 4,
  },
  brand: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BFA5',
  },
  originalPrice: {
    fontSize: 14,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CartItem;