import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Users, Package, DollarSign, Plus, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';
import Card from '@/components/ui/Card';
import SalesChart from '@/components/Dashboard/SalesChart';
import UsersWidget from '@/components/Dashboard/UsersWidget';
import TopProducts from '@/components/Dashboard/TopProducts';
import CategoryPieChart from '@/components/Dashboard/CategoryPieChart';
import Button from '@/components/ui/Button';

import { 
  monthlyRevenue, 
  customerData, 
  topProducts, 
  salesByCategory, 
  orders 
} from '@/data/orderData';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 900;

export default function AdminScreen() {
  const { user, isAdmin } = useAuth();
  const { products } = useProducts();
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState(42);
  const [revenueGrowth, setRevenueGrowth] = useState(8.5);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('dashboard');
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    // Simulate changing active users
    const userInterval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(35, Math.min(50, prev + change));
      });
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(userInterval);
    };
  }, []);
  
  // Only admins can access this screen
  if (!isAdmin) {
    return (
      <View style={styles.unauthorizedContainer}>
        <Text style={styles.unauthorizedTitle}>Unauthorized Access</Text>
        <Text style={styles.unauthorizedText}>
          You do not have permission to access the admin panel.
        </Text>
        <Button
          title="Go to Home"
          onPress={() => router.replace('/')}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00BFA5" />
        <Text style={styles.loadingText}>Loading dashboard data...</Text>
      </View>
    );
  }

  const renderDashboard = () => (
    <ScrollView style={styles.dashboardContainer}>
      <View style={styles.statsRow}>
        <StatCard 
          title="Total Sales"
          value={`$${((monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0)) / 1000).toFixed(1)}K`}
          change={`+${revenueGrowth}%`}
          positive={true}
          icon={<DollarSign size={24} color="#00BFA5" />}
        />
        
        <StatCard 
          title="Products"
          value={products.length.toString()}
          change="+3 new"
          positive={true}
          icon={<Package size={24} color="#00BFA5" />}
        />
        
        <StatCard 
          title="Customers"
          value={customerData.total.toString()}
          change={`+${customerData.new} today`}
          positive={true}
          icon={<Users size={24} color="#00BFA5" />}
        />
      </View>
      
      <View style={isLargeScreen ? styles.dashboardRowLarge : styles.dashboardRow}>
        <View style={isLargeScreen ? styles.chartContainerLarge : styles.chartContainer}>
          <SalesChart data={monthlyRevenue} />
        </View>
        
        <View style={isLargeScreen ? styles.userContainerLarge : styles.userContainer}>
          <UsersWidget data={customerData} activeUsers={activeUsers} />
        </View>
      </View>
      
      <View style={isLargeScreen ? styles.dashboardRowLarge : styles.dashboardRow}>
        <View style={isLargeScreen ? styles.productContainerLarge : styles.chartContainer}>
          <TopProducts products={topProducts} />
        </View>
        
        <View style={isLargeScreen ? styles.pieContainerLarge : styles.chartContainer}>
          <CategoryPieChart data={salesByCategory} />
        </View>
      </View>
      
      <View style={styles.recentOrdersContainer}>
        <Card>
          <View style={styles.recentOrdersHeader}>
            <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal={!isLargeScreen} style={styles.ordersTable}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, styles.orderIdCell]}>Order ID</Text>
                <Text style={[styles.tableHeaderCell, styles.dateCell]}>Date</Text>
                <Text style={[styles.tableHeaderCell, styles.amountCell]}>Amount</Text>
                <Text style={[styles.tableHeaderCell, styles.statusCell]}>Status</Text>
              </View>
              
              {orders.slice(0, 5).map((order) => (
                <View key={order.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.orderIdCell]}>{order.id}</Text>
                  <Text style={[styles.tableCell, styles.dateCell]}>{order.date}</Text>
                  <Text style={[styles.tableCell, styles.amountCell]}>${order.total.toFixed(2)}</Text>
                  <View style={[
                    styles.statusBadge,
                    order.status === 'Delivered' && styles.deliveredBadge,
                    order.status === 'Processing' && styles.processingBadge,
                    order.status === 'Shipped' && styles.shippedBadge,
                  ]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </Card>
      </View>
    </ScrollView>
  );
  
  const renderProducts = () => (
    <View style={styles.productsContainer}>
      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Product Management</Text>
        <Button
          title="Add Product"
          size="small"
          icon={<Plus size={16} color="white" />}
          onPress={() => {}}
        />
      </View>
      
      <Text style={styles.comingSoonText}>
        Product management interface coming soon.
      </Text>
    </View>
  );
  
  const renderOrders = () => (
    <View style={styles.productsContainer}>
      <Text style={styles.productsTitle}>Order Management</Text>
      <Text style={styles.comingSoonText}>
        Order management interface coming soon.
      </Text>
    </View>
  );
  
  const renderCustomers = () => (
    <View style={styles.productsContainer}>
      <Text style={styles.productsTitle}>Customer Management</Text>
      <Text style={styles.comingSoonText}>
        Customer management interface coming soon.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.adminContainer}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.adminTitle}>Admin Panel</Text>
          </View>
          
          <View style={styles.sidebarMenu}>
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                selectedTab === 'dashboard' && styles.selectedSidebarItem
              ]}
              onPress={() => setSelectedTab('dashboard')}
            >
              <View style={styles.sidebarIcon}>
                <DollarSign size={20} color={selectedTab === 'dashboard' ? '#00BFA5' : '#757575'} />
              </View>
              <Text 
                style={[
                  styles.sidebarText,
                  selectedTab === 'dashboard' && styles.selectedSidebarText
                ]}
              >
                Dashboard
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                selectedTab === 'products' && styles.selectedSidebarItem
              ]}
              onPress={() => setSelectedTab('products')}
            >
              <View style={styles.sidebarIcon}>
                <Package size={20} color={selectedTab === 'products' ? '#00BFA5' : '#757575'} />
              </View>
              <Text 
                style={[
                  styles.sidebarText,
                  selectedTab === 'products' && styles.selectedSidebarText
                ]}
              >
                Products
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                selectedTab === 'orders' && styles.selectedSidebarItem
              ]}
              onPress={() => setSelectedTab('orders')}
            >
              <View style={styles.sidebarIcon}>
                <ShoppingBag size={20} color={selectedTab === 'orders' ? '#00BFA5' : '#757575'} />
              </View>
              <Text 
                style={[
                  styles.sidebarText,
                  selectedTab === 'orders' && styles.selectedSidebarText
                ]}
              >
                Orders
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sidebarItem,
                selectedTab === 'customers' && styles.selectedSidebarItem
              ]}
              onPress={() => setSelectedTab('customers')}
            >
              <View style={styles.sidebarIcon}>
                <Users size={20} color={selectedTab === 'customers' ? '#00BFA5' : '#757575'} />
              </View>
              <Text 
                style={[
                  styles.sidebarText,
                  selectedTab === 'customers' && styles.selectedSidebarText
                ]}
              >
                Customers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.content}>
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'products' && renderProducts()}
          {selectedTab === 'orders' && renderOrders()}
          {selectedTab === 'customers' && renderCustomers()}
        </View>
      </View>
    </View>
  );
}

const StatCard = ({ title, value, change, positive, icon }) => (
  <Card style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      {icon}
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={[
      styles.statChange,
      positive ? styles.positiveChange : styles.negativeChange
    ]}>
      {change}
    </Text>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  adminContainer: {
    flex: 1,
    flexDirection: width > 900 ? 'row' : 'column',
  },
  sidebar: {
    width: width > 900 ? 250 : '100%',
    backgroundColor: 'white',
    borderRightWidth: width > 900 ? 1 : 0,
    borderBottomWidth: width > 900 ? 0 : 1,
    borderColor: '#EEEEEE',
    ...(width <= 900 && {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    }),
  },
  sidebarHeader: {
    padding: width > 900 ? 16 : 0,
    borderBottomWidth: width > 900 ? 1 : 0,
    borderBottomColor: '#EEEEEE',
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  sidebarMenu: {
    flex: 1,
    ...(width <= 900 && {
      flexDirection: 'row',
    }),
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: width > 900 ? 24 : 16,
    borderBottomWidth: width > 900 ? 1 : 0,
    borderBottomColor: '#EEEEEE',
    ...(width <= 900 && {
      paddingVertical: 8,
      paddingHorizontal: 12,
    }),
  },
  selectedSidebarItem: {
    backgroundColor: '#E0F2F1',
    ...(width <= 900 && {
      backgroundColor: 'transparent',
    }),
  },
  sidebarIcon: {
    marginRight: 12,
    ...(width <= 900 && {
      marginRight: 4,
    }),
  },
  sidebarText: {
    fontSize: 16,
    color: '#757575',
    ...(width <= 900 && {
      fontSize: 14,
    }),
  },
  selectedSidebarText: {
    color: '#00796B',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#757575',
  },
  unauthorizedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  unauthorizedText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    maxWidth: 300,
  },
  dashboardContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: width > 600 ? 'row' : 'column',
    marginBottom: 20,
  },
  statCard: {
    flex: width > 600 ? 1 : undefined,
    marginRight: width > 600 ? 16 : 0,
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 16,
    color: '#757575',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 14,
  },
  positiveChange: {
    color: '#4CAF50',
  },
  negativeChange: {
    color: '#F44336',
  },
  dashboardRow: {
    marginBottom: 20,
  },
  dashboardRowLarge: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartContainerLarge: {
    flex: 2,
    marginRight: 20,
  },
  userContainer: {},
  userContainerLarge: {
    flex: 1,
  },
  productContainerLarge: {
    flex: 1,
    marginRight: 20,
  },
  pieContainerLarge: {
    flex: 1,
  },
  recentOrdersContainer: {
    marginBottom: 20,
  },
  recentOrdersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentOrdersTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#00BFA5',
  },
  ordersTable: {
    maxHeight: 300,
  },
  tableContainer: {
    minWidth: 500,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontWeight: '600',
    color: '#757575',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tableCell: {
    fontSize: 14,
  },
  orderIdCell: {
    width: '25%',
  },
  dateCell: {
    width: '25%',
  },
  amountCell: {
    width: '25%',
  },
  statusCell: {
    width: '25%',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  deliveredBadge: {
    backgroundColor: '#E8F5E9',
  },
  processingBadge: {
    backgroundColor: '#FFF8E1',
  },
  shippedBadge: {
    backgroundColor: '#E3F2FD',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  productsContainer: {
    padding: 16,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 40,
    textAlign: 'center',
  },
});