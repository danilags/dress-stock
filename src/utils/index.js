import axios from 'axios';

const API_CALL = async option => {
  try {
    const API_OPTION = {
      baseURL: 'http://localhost:3001/',
      ...option,
    };

    const res = await axios.request(API_OPTION);
    return Promise.resolve(res);
  } catch ({ response }) {
    throw new Error(response);
  }
};

export { API_CALL };
