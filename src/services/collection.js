import axios from 'axios';

const baseUrl = '/api/collections';

const get = (params) => axios.get(baseUrl, { params });

const post = (data) => axios.post(baseUrl, data);

const update = (id, data) => axios.put(`${baseUrl}/${id}`, data);

export default { get, post, update };
