import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, ToastAndroid, Platform, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import DashboardCards from './DashboardCards';

const DashboardScreen = () => {
  const navigation = useNavigation(); // Use the navigation hook
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [numOfDays, setNumOfDays] = useState(1); // State for numOfDays

  const baseURL = "https://www.clarity.ms/export-data/api/v1/project-live-insights";

  const fetchData = async (days) => {
    const storageKey = `dashboardData_${days * 24}h`;

    try {
      // Get the API key from secure storage or other sources
      const apiKey = await SecureStore.getItemAsync('api_key'); // Retrieve API key from secure storage

      if (!apiKey) {
        console.error('API key is missing');
        setError('API key is missing, please set it first.');
        return;
      }

      console.log(`Fetching data from: ${baseURL}/?numOfDays=${days}`);
      const response = await fetch(`${baseURL}/?numOfDays=${days}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`, // Pass the API key in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      // Only call response.json() once
      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${JSON.stringify(responseBody)}`);
      }

      // Save the fetched data to AsyncStorage
      await AsyncStorage.setItem(storageKey, JSON.stringify(responseBody));
      setData(responseBody);
      setError(null);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError('Clarity allows up to 10 refreshes per day. Please check back in 24 hours for updated data.');

      if (Platform.OS === 'android') {
        ToastAndroid.show('Clarity allows up to 10 refreshes per day. Please check back in 24 hours for updated data.', ToastAndroid.LONG);
      }

      // Try to load data from AsyncStorage in case of error
      const storedData = await AsyncStorage.getItem(storageKey);
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useEffect(() => {
    fetchData(numOfDays); // Fetch with the current numOfDays
  }, [numOfDays]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(numOfDays);
  }, [numOfDays]);

  const handleSelectDays = (days) => {
    setNumOfDays(days); // Set numOfDays when a new option is selected
    fetchData(days); // Fetch data with the selected option
  };

  const clearAllData = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Clear SecureStore (expo-secure-store)
      await SecureStore.deleteItemAsync('api_key');  // Delete specific item

      // Optionally, reset state data
      setData([]);
      setError(null);
      setLoading(true);

      // Show a confirmation toast
      ToastAndroid.show('All data has been cleared!', ToastAndroid.LONG);

      // Navigate to 'APIKeyScreen' after clearing data
      navigation.replace('APIKey');  // Replace current screen with the APIKeyScreen

    } catch (error) {
      console.error('Error clearing storage: ', error);
    }
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.pageTitleText}>
        {data.find(item => item.metricName === 'PageTitle')?.information?.[0]?.name ?? 'No title found'}
      </Text>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Days Selector (Switch with 3 options) */}
      <View style={styles.toggleContainer}>
        <View style={styles.buttonsContainer}>
          {[1, 3].map((days) => (
            <TouchableOpacity
              key={days}
              style={[styles.button, numOfDays === days && styles.activeButton]} // Apply active style
              onPress={() => handleSelectDays(days)}
            >
              <Text style={[styles.buttonText, numOfDays === days && styles.activeButtonText]}>
                {days > 1 ? 'Last 3 days' : 'Last 24 Hours'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Delete Button */}
      <DashboardCards data={data} />
      <TouchableOpacity onPress={clearAllData} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete All Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  infoContainer: { marginBottom: 8 },
  text: { fontSize: 16, marginVertical: 4 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' },
  errorBanner: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 8,
    marginBottom: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#211103',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
  pageTitleText: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  deleteButton: {
    marginTop: 20,
    marginBottom: 50,
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default DashboardScreen;
