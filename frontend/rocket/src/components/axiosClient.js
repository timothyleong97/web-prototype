import axios from 'axios';
//This is a client that has been preset to route our API requests via proxy
export default axios.create({
    proxy: {
      host: "http://localhost:",
      port: 3500,
    },
  });