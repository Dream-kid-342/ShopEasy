import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import Card from '../ui/Card';

const TopProducts = ({ products }) => {
  const renderItem = ({ item, index }) => (
    <View style={styles.productItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{index + 1}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productSales}>{item.sales} sold</Text>
      </View>
      <View style={styles.salesGraph}>
        <View 
          style={[
            styles.salesBar, 
            { width: `${(item.sales / products[0].sales) * 100}%` }
          ]} 
        />
      </View>
    </View>
  );

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <TrendingUp size={24} color="#00BFA5" />
        <Text style={styles.title}>Top Selling Products</Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00796B',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
  },
  productSales: {
    fontSize: 12,
    color: '#757575',
  },
  salesGraph: {
    width: 60,
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  salesBar: {
    height: '100%',
    backgroundColor: '#00BFA5',
    borderRadius: 4,
  },
});

export default TopProducts;