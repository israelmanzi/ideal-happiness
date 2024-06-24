import _ from 'axios';

export const axios = _.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  timeout: 5000,
});

export default axios;
