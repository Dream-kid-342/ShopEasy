import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Image, ScrollView } from 'react-native';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { CreditCard, Calendar, Lock } from 'lucide-react-native';

const PaymentForm = ({ onSubmit, onCancel, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCardData({
      ...cardData,
      [field]: value
    });
    
    // Clear error when typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!cardData.cardHolder) {
      newErrors.cardHolder = 'Cardholder name is required';
    }
    
    if (!cardData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    
    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        method: paymentMethod,
        ...cardData
      });
    }
  };

  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return formatted;
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <Text style={styles.amount}>Total: ${amount.toFixed(2)}</Text>
      
      <View style={styles.paymentMethods}>
        <View 
          style={[
            styles.paymentMethod, 
            paymentMethod === 'card' && styles.selectedPaymentMethod
          ]}
          onTouchEnd={() => setPaymentMethod('card')}
        >
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=140' }}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Credit/Debit Card</Text>
        </View>
        
        <View 
          style={[
            styles.paymentMethod, 
            paymentMethod === 'paypal' && styles.selectedPaymentMethod
          ]}
          onTouchEnd={() => setPaymentMethod('paypal')}
        >
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6289102/pexels-photo-6289102.jpeg?auto=compress&cs=tinysrgb&w=140' }}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>PayPal</Text>
        </View>
      </View>
      
      <ScrollView style={styles.form}>
        {paymentMethod === 'card' ? (
          <>
            <Input
              label="Card Number"
              value={cardData.cardNumber}
              onChangeText={(text) => handleInputChange('cardNumber', formatCardNumber(text))}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              error={errors.cardNumber}
              leftIcon={<CreditCard size={20} color="#757575" />}
            />
            
            <Input
              label="Cardholder Name"
              value={cardData.cardHolder}
              onChangeText={(text) => handleInputChange('cardHolder', text)}
              placeholder="John Doe"
              error={errors.cardHolder}
            />
            
            <View style={styles.row}>
              <Input
                label="Expiry Date"
                value={cardData.expiryDate}
                onChangeText={(text) => handleInputChange('expiryDate', formatExpiryDate(text))}
                placeholder="MM/YY"
                keyboardType="numeric"
                error={errors.expiryDate}
                style={styles.halfInput}
                leftIcon={<Calendar size={20} color="#757575" />}
              />
              
              <Input
                label="CVV"
                value={cardData.cvv}
                onChangeText={(text) => handleInputChange('cvv', text.replace(/\D/g, ''))}
                placeholder="123"
                keyboardType="numeric"
                maxLength={4}
                error={errors.cvv}
                style={styles.halfInput}
                leftIcon={<Lock size={20} color="#757575" />}
              />
            </View>
            
            <View style={styles.saveCardContainer}>
              <Text style={styles.saveCardText}>Save card for future payments</Text>
              <Switch
                value={cardData.saveCard}
                onValueChange={(value) => handleInputChange('saveCard', value)}
                trackColor={{ false: '#E0E0E0', true: '#B2DFDB' }}
                thumbColor={cardData.saveCard ? '#00BFA5' : '#f4f3f4'}
              />
            </View>
          </>
        ) : (
          <View style={styles.paypalInfo}>
            <Text style={styles.paypalText}>
              You will be redirected to PayPal to complete your payment securely.
            </Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.actions}>
        <Button
          title="Cancel"
          variant="outline"
          onPress={onCancel}
          style={styles.cancelButton}
        />
        <Button
          title="Pay Now"
          onPress={handleSubmit}
          style={styles.payButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00BFA5',
    marginBottom: 20,
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedPaymentMethod: {
    borderColor: '#00BFA5',
    backgroundColor: '#E0F2F1',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    maxHeight: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  saveCardText: {
    fontSize: 16,
    color: '#212121',
  },
  paypalInfo: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 16,
  },
  paypalText: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  payButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default PaymentForm;