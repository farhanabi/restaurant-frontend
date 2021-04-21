import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/restaurant';

const get = (params) => axios.get(baseUrl, { params });

export default { get };
