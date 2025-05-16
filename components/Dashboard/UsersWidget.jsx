import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';
import Card from '../ui/Card';

const UsersWidget = ({ data, activeUsers }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Users size={24} color="#00BFA5" />
        <Text style={styles.title}>Users</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{activeUsers}</Text>
          <Text style={styles.statLabel}>Online Now</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{data.total}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{data.new}</Text>
          <Text style={styles.detailLabel}>New Today</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{data.returning}</Text>
          <Text style={styles.detailLabel}>Returning</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{((data.active / data.total) * 100).toFixed(0)}%</Text>
          <Text style={styles.detailLabel}>Active Rate</Text>
        </View>
      </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00BFA5',
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
  },
});

export default UsersWidget;