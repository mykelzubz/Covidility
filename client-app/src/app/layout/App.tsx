import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Booking } from "../models/booking";
import NavBar from "./NavBar";
import BookingDashboard from "../../features/bookings/dashboard/BookingDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import axios from "axios";

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Bookings.list().then((response) => {
      let bookings: Booking[] = [];
      response.forEach((booking) => {
        booking.testDate = booking.testDate.split("T")[0];
        bookings.push(booking);
      });
      setBookings(bookings);
      setLoading(false);
    });
  }, []);

  function handleSelectBooking(id: string) {
    setSelectedBooking(bookings.find((x) => x.id === id));
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
    setSubmitting(true);

    booking.id = uuid();

    axios
      .post("http://localhost:5000/api/Booking", booking)
      .then(function (response) {
        setBookings([...bookings, booking]);
        setSelectedBooking(booking);
        setEditMode(false);
        setSubmitting(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    // agent.Bookings.create(booking).then(() => {
    //   console.log('before');
    //   setBookings([...bookings, booking]);
    //   setSelectedBooking(booking);
    //   setEditMode(false);
    //   setSubmitting(false);
    //   console.log('after');
    // });
  }

  if (loading) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <BookingDashboard
          bookings={bookings}
          selectedBooking={selectedBooking}
          selectBooking={handleSelectBooking}
          cancelSelectBooking={handleCancelSelectBooking}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createBooking={handleCreateBooking}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
