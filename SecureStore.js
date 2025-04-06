import * as SecureStore from 'expo-secure-store';

const secureStorage = {
  saveAPIKey: async (key) => {
    await SecureStore.setItem('api_key', key);
  },

  getAPIKey: async () => {
    return await SecureStore.getItem('api_key');
  },
};

export default secureStorage;
