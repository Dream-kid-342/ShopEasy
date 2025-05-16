import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Package, Truck, ShoppingBag, Check } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import { orders } from '@/data/orderData';
import { products } from '@/data/products';

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleBack = () => {
    router.back();
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Processing':
        return <Package size={20} color="#FFC107" />;
      case 'Shipped':
        return <Truck size={20} color="#2196F3" />;
      case 'Delivered':
        return <Check size={20} color="#4CAF50" />;
      default:
        return <ShoppingBag size={20} color="#9E9E9E" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing':
        return '#FFF8E1';
      case 'Shipped':
        return '#E3F2FD';
      case 'Delivered':
        return '#E8F5E9';
      default:
        return '#EEEEEE';
    }
  };
  
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        {orders.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              
              <View 
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.status) }
                ]}
              >
                {getStatusIcon(order.status)}
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.productsContainer}>
              {order.products.map((productId, index) => {
                const product = getProductById(productId);
                if (!product) return null;
                
                return (
                  <View key={productId} style={styles.productItem}>
                    <Image 
                      source={{ uri: product.image }} 
                      style={styles.productImage} 
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                      <Text style={styles.productBrand}>{product.brand}</Text>
                      <View style={styles.productPriceRow}>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                        <Text style={styles.productQuantity}>x{order.quantities[index]}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </Card>
        ))}
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
  orderCard: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#757575',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  productsContainer: {
    marginBottom: 12,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  productQuantity: {
    fontSize: 14,
    color: '#757575',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00BFA5',
  },
  detailsButton: {
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00796B',
  },
});