/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import {
  Button, Input, Layout, Table,
} from 'antd';
import PropTypes from 'prop-types';

import collectionService from '../services/collection';

const filterContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: 'transparent',
};
const addCollectionInputStyle = {
  flex: 1,
  border: '1px solid black',
  borderRadius: '8px 0 0 8px',
  overflow: 'hidden',
};
const finishButtonStyle = {
  border: '1px solid black',
  overflow: 'hidden',
  borderRadius: '0 8px 8px 0',
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
];

const CollectionModal = ({ restaurantName }) => {
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');
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

  const handleCreateCollection = () => {
    collectionService
      .post({
        restaurant_name: restaurantName,
        collection_name: collectionName,
      })
      .then((response) => setCollections([...collections, response.data]));
  };

  return (
    <>
      <Layout style={{ ...filterContainer, marginBottom: 14 }}>
        <Input
          style={{
            ...addCollectionInputStyle,
            borderRadius: (collections.filter(
              (c) => c.name.toLowerCase().includes(collectionName.toLowerCase()),
            ).length > 0) ? '8px 8px 8px 8px' : '8px 0 0 8px',
          }}
          placeholder="Create or search collection name (e.g. Meat-lovers)"
          onChange={(e) => setCollectionName(e.target.value)}
          value={collectionName}
        />
        {(collections.filter(
          (c) => c.name.toLowerCase().includes(collectionName.toLowerCase()),
        ).length === 0)
        && (
        <Button
          style={finishButtonStyle}
          onClick={handleCreateCollection}
        >
          Create new
        </Button>
        )}
      </Layout>
      <Table
        loading={loading}
        columns={column}
        dataSource={collections.filter(
          (c) => c.name.toLowerCase().includes(collectionName.toLowerCase()),
        )}
      />
    </>
  );
};

CollectionModal.propTypes = {
  restaurantName: PropTypes.string,
};

export default CollectionModal;
