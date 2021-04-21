/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Button, Input, Layout, Table,
} from 'antd';

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

const CollectionModal = ({ restaurantName }) => {
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);

  return (
    <>
      <Layout style={{ ...filterContainer, marginBottom: 14 }}>
        <Input
          style={{
            ...addCollectionInputStyle,
            borderRadius: collections.length > 0 ? '8px 8px 8px 8px' : '8px 0 0 8px',
          }}
          placeholder="Create or search collection name (e.g. Meat-lovers)"
          onChange={(e) => setCollectionName(e.target.value)}
          value={collectionName}
        />
        {collections.length === 0 && <Button style={finishButtonStyle}>Create</Button>}
      </Layout>
      <Table />
    </>
  );
};

export default CollectionModal;
