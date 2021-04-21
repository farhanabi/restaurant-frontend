import React, { useEffect, useState } from 'react';
import {
  DatePicker, Input, Layout, Table,
} from 'antd';
import moment from 'moment';
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
    width: '50%',
    render: (hours) => hours.split('/').map((h) => <p>{h.trim()}</p>),
  },
];

const App = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const column = renderColumn(restaurants);

  useEffect(() => {
    restaurantService
      .get()
      .then((response) => {
        setRestaurants(response.data);
      });
  }, []);

  const handleDateChange = (val) => {
    setDate(moment(val).toISOString());
    restaurantService
      .get({ date: moment(val).toISOString(), query })
      .then((response) => {
        setRestaurants(response.data);
      });
  };

  const handleSearchbarChange = (val) => {
    setQuery(val);
    restaurantService
      .get({ date, query: val })
      .then((response) => {
        setRestaurants(response.data);
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
      />
    </Layout>
  );
};

export default App;
