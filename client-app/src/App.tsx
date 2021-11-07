import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/Booking').then((response) => {
      console.log(response);
      setBookings(response.data);
    })
  }, []);

  return (
    <div>
      <Header as='h2' icon='universal access' content='Covidility' />
        <List>
          {
            bookings.map((booking: any) => (
              <List.Item key={booking.id}>
                {booking.firstName + ' ' + booking.lastName}
              </List.Item>
            ))
          }
        </List>
    </div>
  );
}

export default App;
