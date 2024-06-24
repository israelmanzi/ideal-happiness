import _ from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axios = _.create({
  baseURL: 'http://192.168.0.2:4000',
  timeout: 5000,
});

// Get the token from AsyncStorage
AsyncStorage.getItem('token')
  .then((token) => {
    // Set the token as the authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  })
  .catch((error) => {
    console.log('Error retrieving token from AsyncStorage:', error);
  });

export default axios;