import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Booking } from '../models/booking';
import NavBar from './NavBar';
import BookingDashboard from '../../features/bookings/dashboard/BookingDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Booking[]>('http://localhost:5000/api/Booking').then((response) => {
      
      setBookings(response.data);
    })
  }, []);

  function handleSelectBooking(id: string) {
    setSelectedBooking(bookings.find(x => x.id === id));
  }

  function handleCancelSelectBooking() {
    setSelectedBooking(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectBooking(id) : handleCancelSelectBooking();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateBooking(booking: Booking) {
    setBookings([...bookings, {...booking, id: uuid()}]);
    setEditMode(false);
    setSelectedBooking(booking);
  }

  return (
    <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          <BookingDashboard 
            bookings={bookings} 
            selectedBooking={selectedBooking}
            selectBooking={handleSelectBooking}
            cancelSelectBooking={handleCancelSelectBooking}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createBooking={handleCreateBooking}
          />

        </Container>
    </>
  );
}

export default App;
