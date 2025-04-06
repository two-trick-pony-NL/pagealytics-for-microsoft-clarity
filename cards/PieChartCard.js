import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const SingleMetricWithPieChartCard = ({ label, data }) => {
  // Predefined color palette
  const colorPalette = [
    '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087',
    '#f95d6a', '#ff7c43', '#ffa600', '#6D6875', '#49306b'
  ];


  // Function to group items if more than 10
  const groupOthers = (data) => {
    if (data.length <= 10) return data;

    const topData = data.slice(0, 10);
    const others = data.slice(10);
    const otherSum = others.reduce((sum, item) => sum + item.sessionsCount, 0);
    topData.push({
      label: 'Other',
      value: otherSum,
      color: colorPalette[9], // Use the last color in the palette for "Other"
      text: `Other (${otherSum})` // Label for the "Other" category
    });

    return topData;
  };

  // Prepare the pie chart data
  const pieChartData = groupOthers(data.map((item, index) => ({
    value: parseInt(item.sessionsCount), // Convert the session count to an integer
    label: item.name,
    color: colorPalette[index] || colorPalette[9], // Use the color palette
    text: `${item.name} (${item.sessionsCount})`, // Label with sessions count
  })));

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.count}>{label}</Text>

        <View style={styles.chartContainer}>
          {/* Render the PieChart */}
          <PieChart
            data={pieChartData}
            radius={80} // Set the radius for the pie chart
            innerRadius={50} // Inner radius (makes it look like a donut chart)
            showText={false} // Hide text inside the chart to display outside
            style={styles.pieChart} // Styling the chart
          />
        </View>

        {/* Render the labels (legend) below the pie chart */}
        <View style={styles.labelsContainer}>
          {pieChartData.map((item, index) => (
            <View key={index} style={styles.labelRow}>
              <View
                style={[
                  styles.labelIndicator,
                  { backgroundColor: item.color }, // Match the color to pie slice
                ]}
              />
              <Text style={styles.labelText}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// Define the component styles
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20, // Margin for the wrapper
  },
  card: {
    backgroundColor: '#fff', // Card background color
    borderRadius: 16, // Rounded corners
    padding: 24, // Padding inside the card
    paddingTop: 32, // Padding for the top
    alignItems: 'center', // Center content horizontally
    shadowColor: '#000', // Shadow color for the card
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 4, // Elevation for Android devices
    position: 'relative', // Position relative for stacking elements
  },
  count: {
    fontSize: 24, // Font size for the label
    fontWeight: 'bold', // Bold text for the label
    color: '#111', // Text color
    marginBottom: 16, // Margin below the label
  },
  chartContainer: {
    alignItems: 'center', // Center the chart
    marginBottom: 16, // Space between the chart and the legend
  },
  pieChart: {
    marginTop: 16, // Margin top for the pie chart
  },
  labelsContainer: {
    marginTop: 16, // Space between the pie chart and the labels
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Space between each label
  },
  labelIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8, // Space between color circle and label
  },
  labelText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SingleMetricWithPieChartCard;
