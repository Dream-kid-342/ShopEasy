import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Card from '../ui/Card';

const { width } = Dimensions.get('window');
const chartWidth = width < 600 ? width - 40 : 500;

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        data: data.map(item => item.revenue / 1000), // Convert to thousands for better display
        color: (opacity = 1) => `rgba(0, 191, 165, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Revenue (K$)']
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 121, 107, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const revenueGrowth = ((data[data.length - 1].revenue - data[0].revenue) / data[0].revenue * 100).toFixed(1);

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Performance</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${(totalRevenue / 1000).toFixed(1)}K</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[
              styles.statValue, 
              revenueGrowth >= 0 ? styles.positiveGrowth : styles.negativeGrowth
            ]}>
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%
            </Text>
            <Text style={styles.statLabel}>Growth</Text>
          </View>
        </View>
      </View>
      
      <LineChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
  },
  positiveGrowth: {
    color: '#4CAF50',
  },
  negativeGrowth: {
    color: '#F44336',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default SalesChart;