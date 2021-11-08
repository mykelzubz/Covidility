import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Booking } from '../models/booking';
import NavBar from './NavBar';
import BookingDashboard from '../../features/bookings/dashboard/BookingDashboard';

function App() {

  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    axios.get<Booking[]>('http://localhost:5000/api/Booking').then((response) => {
      
      setBookings(response.data);
    })
  }, []);

  return (
    <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <BookingDashboard bookings={bookings} />

        </Container>
    </>
  );
}

export default App;
