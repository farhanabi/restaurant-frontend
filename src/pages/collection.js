import React, { useEffect, useState } from 'react';
import {
  Input, Layout, Table,
} from 'antd';

import collectionService from '../services/collection';
import 'antd/dist/antd.css';

const pageStyles = {
  display: 'flex',
  flexDirection: 'column',
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const filterContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};
const inputStyle = {
  flex: 1,
  marginRight: '16px',
  border: '1px solid black',
  borderRadius: 8,
  overflow: 'hidden',
};
const tableStyle = {
  marginTop: '16px',
  border: '1px solid black',
  borderRadius: 16,
  overflow: 'hidden',
};

const renderColumn = (array) => [
  {
    title: '#', key: 'id', width: '75px', render: (_, record) => <p>{array.indexOf(record) + 1}</p>,
  },
  {
    title: 'Collection Name',
    key: 'name',
    dataIndex: 'name',
    render: (name) => <p>{name}</p>,
  },
  {
    title: 'Restaurants',
    key: 'restaurants',
    dataIndex: 'restaurants',
    render: (restaurants) => restaurants.map((r, i) => <p key={i}>{r}</p>),
  },
];

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState([]);
  const column = renderColumn(collections);

  useEffect(() => {
    collectionService
      .get()
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <Layout style={pageStyles}>
      <h1 style={{ marginBottom: -4 }}>Restaurant Collection Browser</h1>
      <p>
        Browse restaurant collection using our tools.
        {' '}
        Just input your keywords and enjoy the results! or you can also search the restaurant
        {' '}
        <a href="/">here</a>
      </p>
      <div style={filterContainer}>
        <Input placeholder="Search collection name" onChange={(e) => setQuery(e.target.value)} value={query} style={inputStyle} />
      </div>
      <Table
        columns={column}
        dataSource={collections.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))}
        style={tableStyle}
        loading={loading}
      />
      {console.log(collections)}
    </Layout>
  );
};

export default Collection;
