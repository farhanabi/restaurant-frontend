import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/collections';

const get = (params) => axios.get(baseUrl, { params });

const post = (data) => axios.post(baseUrl, data);

const update = (name, data) => axios.put(baseUrl, { name, data });

export default { get, post, update };
