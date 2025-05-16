import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Card from '../ui/Card';

const { width } = Dimensions.get('window');
const chartWidth = width < 600 ? width - 40 : 300;

const colors = [
  '#00BFA5', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E0F2F1'
];

const CategoryPieChart = ({ data }) => {
  const chartData = data.map((item, index) => ({
    name: item.category,
    population: item.percentage,
    color: colors[index % colors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Sales by Category</Text>
      
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={chartWidth}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryPieChart;