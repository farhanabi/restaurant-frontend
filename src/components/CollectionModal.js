/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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

const renderColumn = (array, restaurantName, handleUpdateCollection) => [
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
    key: 'action',
    dataIndex: 'restaurants',
    render: (restaurants, { id, name }) => {
      const found = restaurants.findIndex(
        (r) => r === restaurantName,
      ) >= 0;
      if (found) {
        return (
          <p
            onClick={() => handleUpdateCollection(
              id,
              {
                collection_name: name,
                restaurants: restaurants.filter((r) => r !== restaurantName),
              },
            )}
            style={{ color: 'red', cursor: 'pointer', textAlign: 'right' }}
          >
            Remove
          </p>
        );
      } return (
        <p
          onClick={() => handleUpdateCollection(
            id,
            {
              collection_name: name,
              restaurants: [...restaurants, restaurantName],
            },
          )}
          style={{ color: 'green', cursor: 'pointer', textAlign: 'right' }}
        >
          Add
        </p>
      );
    },
  },
];

const CollectionModal = ({ restaurantName }) => {
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);

  const getCollection = () => {
    setLoading(true);
    collectionService
      .get()
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      });
  };

  const handleCreateCollection = () => {
    setLoading(true);
    collectionService
      .post({
        restaurant_name: restaurantName,
        collection_name: collectionName,
      })
      .then(() => {
        getCollection();
        setLoading(false);
      });
  };

  const handleUpdateCollection = (id, data) => {
    setLoading(true);
    collectionService
      .update(id, data)
      .then(() => {
        getCollection();
        setLoading(false);
      });
  };

  useEffect(() => {
    getCollection();
  }, []);

  const column = renderColumn(collections, restaurantName, handleUpdateCollection);

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

CollectionModal.defaultProps = {
  restaurantName: 'Restaurant',
};

export default CollectionModal;
