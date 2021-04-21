import React, { useEffect, useState } from 'react';
import {
  Button, DatePicker, Input, Layout, Modal, Table,
} from 'antd';
import moment from 'moment';

import CollectionModal from '../components/CollectionModal';
import restaurantService from '../services/restaurant';
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
const datepickerStyle = {
  minWidth: '400px',
  border: '1px solid black',
  borderRadius: 8,
};
const tableStyle = {
  marginTop: '16px',
  border: '1px solid black',
  borderRadius: 16,
  overflow: 'hidden',
};
const buttonStyle = {
  border: '1px solid black',
  borderRadius: 8,
  overflow: 'hidden',
};

const renderColumn = (array) => [
  {
    title: '#', key: 'id', width: '75px', render: (_, record) => <p>{array.indexOf(record) + 1}</p>,
  },
  {
    title: 'Restaurant Name',
    key: 'name',
    dataIndex: 'name',
    render: (name) => <p>{name}</p>,
  },
  {
    title: 'Open Hours',
    key: 'hours',
    dataIndex: 'hours',
    width: '40%',
    render: (hours) => hours.split('/').map((h) => <p>{h.trim()}</p>),
  },
  {
    width: '10%',
    render: (_, record) => {
      const [isModalVisible, setIsModalVisible] = useState(false);

      return (
        <>
          <Button style={buttonStyle} onClick={() => setIsModalVisible(true)}>
            Add to collection
          </Button>
          <Modal
            title={`Add ${record.name} to collection`}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <CollectionModal restaurantName={record.name} />
          </Modal>
        </>
      );
    },
  },
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [date, setDate] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const column = renderColumn(restaurants);

  useEffect(() => {
    restaurantService
      .get()
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      });
  }, []);

  const handleDateChange = (val) => {
    setLoading(true);
    setDate(moment(val).toISOString());
    restaurantService
      .get({ date: moment(val).toISOString(), query })
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      });
  };

  const handleSearchbarChange = (val) => {
    setLoading(true);
    setQuery(val);
    restaurantService
      .get({ date, query: val })
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      });
  };

  return (
    <Layout style={pageStyles}>
      <h1 style={{ marginBottom: -4 }}>Restaurant Browser</h1>
      <p>
        Browse your favorite restaurant using our tools.
        {' '}
        Just input your keywords, your time, or both and enjoy the results!
      </p>
      <div style={filterContainer}>
        <Input placeholder="Search restaurant name" onChange={(e) => handleSearchbarChange(e.target.value)} style={inputStyle} />
        <DatePicker
          format="LLLL"
          showTime={{
            defaultValue: moment('00:00', 'HH:mm'),
            format: 'HH:mm',
          }}
          onChange={handleDateChange}
          style={datepickerStyle}
        />
      </div>
      <Table
        columns={column}
        dataSource={restaurants}
        style={tableStyle}
        loading={loading}
      />
    </Layout>
  );
};

export default App;
