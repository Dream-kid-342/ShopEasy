import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag, ArrowRight } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItem from '@/components/CartItem';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CartScreen() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push('/checkout');
    }
  };
  
  const handleContinueShopping = () => {
    router.push('/products');
  };

  const shippingCost = totalPrice > 0 ? 10 : 0;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingBag size={80} color="#E0E0E0" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven't added any products to your cart yet.
        </Text>
        <Button
          title="Browse Products"
          onPress={handleContinueShopping}
          style={styles.browseButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartItemsContainer}>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <CartItem item={item} />
          )}
          keyExtractor={(item) => item.product.id.toString()}
          contentContainerStyle={styles.cartItems}
        />
      </View>
      
      <Card style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shippingCost.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          style={styles.checkoutButton}
          icon={<ArrowRight size={16} color="white" />}
        />
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCart}
        >
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItems: {
    padding: 16,
  },
  summaryContainer: {
    margin: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00BFA5',
  },
  checkoutButton: {
    marginBottom: 12,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#FF5252',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 300,
  },
  browseButton: {
    minWidth: 200,
  },
});