import React, { useState } from 'react';
import { DatePicker, Input } from 'antd';
import moment from 'moment';
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
  width: '80vw',
};
const inputStyle = {
  width: '70%',
  marginRight: '16px',
  border: '1px solid black',
  borderRadius: 8,
};
const datepickerStyle = {
  width: '30%',
  border: '1px solid black',
  borderRadius: 8,
};

const App = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState(null);

  const handleDateChange = (val) => {
    setDate(moment(val).toISOString());
    console.log({ date });
  };

  const handleSearchbarChange = (val) => {
    setQuery(val);
    console.log({ query });
  };

  return (
    <main style={pageStyles}>
      <h1 style={{ marginBottom: -4 }}>Restaurant Browser</h1>
      <p>Browse your favorite restaurant using our tools. Just input your keywords, your time, or both and enjoy the results!</p>
      <div style={filterContainer}>
        <Input placeholder="Search restaurant name" onChange={(e) => handleSearchbarChange(e.target.value)} style={inputStyle} />
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          showTime={{
            defaultValue: moment('00:00:00', 'HH:mm:ss'),
            format: 'HH:mm',
          }}
          onChange={handleDateChange}
          style={datepickerStyle}
        />
      </div>
    </main>
  );
};

export default App;
