import axios from 'axios';

const baseUrl = '/api/restaurant';

const get = (params) => axios.get(baseUrl, { params });

export default { get };
