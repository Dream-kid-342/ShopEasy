import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, MapPin, Clock, Check } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PaymentForm from '@/components/PaymentForm';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState('summary'); // summary, payment, confirmation
  
  const handleBack = () => {
    if (checkoutStep === 'payment') {
      setCheckoutStep('summary');
    } else {
      router.back();
    }
  };
  
  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
  };
  
  const handlePaymentSubmit = () => {
    // In a real app, this would process the payment
    setCheckoutStep('confirmation');
    clearCart();
  };
  
  const handlePaymentCancel = () => {
    setCheckoutStep('summary');
  };
  
  const handleReturnToHome = () => {
    router.replace('/');
  };
  
  // Calculate totals
  const shippingCost = 10;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {checkoutStep === 'summary' ? 'Checkout' : 
           checkoutStep === 'payment' ? 'Payment' : 'Order Confirmation'}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        {checkoutStep === 'summary' && (
          <>
            <Card style={styles.addressCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderContent}>
                  <MapPin size={20} color="#00BFA5" />
                  <Text style={styles.cardTitle}>Shipping Address</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Change</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.addressInfo}>
                <Text style={styles.addressName}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.addressLine}>123 Main Street, Apt 4B</Text>
                <Text style={styles.addressLine}>New York, NY 10001</Text>
                <Text style={styles.addressLine}>United States</Text>
                <Text style={styles.addressPhone}>+1 (555) 123-4567</Text>
              </View>
            </Card>
            
            <Card style={styles.deliveryCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderContent}>
                  <Clock size={20} color="#00BFA5" />
                  <Text style={styles.cardTitle}>Delivery Method</Text>
                </View>
              </View>
              
              <View style={styles.deliveryOptions}>
                <TouchableOpacity style={[styles.deliveryOption, styles.selectedDeliveryOption]}>
                  <View style={styles.deliveryOptionContent}>
                    <Text style={styles.deliveryOptionTitle}>Standard Delivery</Text>
                    <Text style={styles.deliveryOptionSubtitle}>Delivery in 3-5 business days</Text>
                  </View>
                  <Text style={styles.deliveryOptionPrice}>$10.00</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.deliveryOption}>
                  <View style={styles.deliveryOptionContent}>
                    <Text style={styles.deliveryOptionTitle}>Express Delivery</Text>
                    <Text style={styles.deliveryOptionSubtitle}>Delivery in 1-2 business days</Text>
                  </View>
                  <Text style={styles.deliveryOptionPrice}>$20.00</Text>
                </TouchableOpacity>
              </View>
            </Card>
            
            <Card style={styles.orderSummaryCard}>
              <Text style={styles.orderSummaryTitle}>Order Summary</Text>
              
              {cart.map((item) => {
                const discountedPrice = item.product.discount > 0 
                  ? item.product.price * (1 - item.product.discount / 100) 
                  : item.product.price;
                
                return (
                  <View key={item.product.id} style={styles.orderItem}>
                    <View style={styles.orderItemDetails}>
                      <Text style={styles.orderItemName} numberOfLines={1}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.orderItemPrice}>
                        ${discountedPrice.toFixed(2)} x {item.quantity}
                      </Text>
                    </View>
                    <Text style={styles.orderItemTotal}>
                      ${(discountedPrice * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                );
              })}
              
              <View style={styles.divider} />
              
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
              
              <View style={styles.summaryRowTotal}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
              </View>
            </Card>
            
            <View style={styles.actionButtons}>
              <Button
                title="Continue Shopping"
                variant="outline"
                onPress={handleReturnToHome}
                style={styles.continueButton}
              />
              <Button
                title="Proceed to Payment"
                onPress={handleProceedToPayment}
                style={styles.proceedButton}
              />
            </View>
          </>
        )}
        
        {checkoutStep === 'payment' && (
          <PaymentForm 
            onSubmit={handlePaymentSubmit}
            onCancel={handlePaymentCancel}
            amount={finalTotal}
          />
        )}
        
        {checkoutStep === 'confirmation' && (
          <View style={styles.confirmationContainer}>
            <View style={styles.successIcon}>
              <Check size={40} color="white" />
            </View>
            
            <Text style={styles.confirmationTitle}>Order Placed Successfully!</Text>
            <Text style={styles.confirmationText}>
              Thank you for your purchase. Your order has been received and is being processed.
            </Text>
            
            <Card style={styles.orderDetailCard}>
              <Text style={styles.orderDetailTitle}>Order Details</Text>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Order Number</Text>
                <Text style={styles.orderDetailValue}>#ORD-{Math.floor(Math.random() * 10000)}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Date</Text>
                <Text style={styles.orderDetailValue}>{new Date().toLocaleDateString()}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Total</Text>
                <Text style={styles.orderDetailValue}>${finalTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.orderDetailRow}>
                <Text style={styles.orderDetailLabel}>Payment Method</Text>
                <Text style={styles.orderDetailValue}>Credit Card</Text>
              </View>
            </Card>
            
            <Text style={styles.emailNotice}>
              A confirmation email has been sent to {user?.email || 'your email address'}.
            </Text>
            
            <Button
              title="Return to Home"
              onPress={handleReturnToHome}
              style={styles.returnButton}
            />
          </View>
        )}
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addressCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editButtonText: {
    color: '#00BFA5',
    fontWeight: '500',
  },
  addressInfo: {
    marginLeft: 28,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    color: '#424242',
    marginTop: 4,
  },
  deliveryCard: {
    marginBottom: 16,
  },
  deliveryOptions: {},
  deliveryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedDeliveryOption: {
    borderColor: '#00BFA5',
    backgroundColor: '#E0F2F1',
  },
  deliveryOptionContent: {
    flex: 1,
  },
  deliveryOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  deliveryOptionSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  deliveryOptionPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderSummaryCard: {
    marginBottom: 16,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderItemDetails: {
    flex: 1,
    marginRight: 8,
  },
  orderItemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: 14,
    color: '#757575',
  },
  orderItemTotal: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 16,
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  continueButton: {
    flex: 1,
    marginRight: 8,
  },
  proceedButton: {
    flex: 1,
    marginLeft: 8,
  },
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  orderDetailCard: {
    width: '100%',
    marginBottom: 24,
  },
  orderDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 16,
    color: '#757575',
  },
  orderDetailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  emailNotice: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24,
  },
  returnButton: {
    width: '100%',
  },
});