import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Booking } from "../models/booking";
import NavBar from "./NavBar";
import BookingDashboard from "../../features/bookings/dashboard/BookingDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import axios from "axios";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {

  const {bookingStore} = useStore();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    bookingStore.loadBookings();
  }, [bookingStore]);

  // function handleCreateBooking(booking: Booking) {

  //   axios
  //     .post("http://localhost:5000/api/Booking", booking)
  //     .then(function (response) {
  //       setBookings([...bookings, booking]);
  //       setSelectedBooking(booking);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  if (bookingStore.loadingInitial) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>

        <BookingDashboard />
      </Container>
    </>
  );
}

export default observer(App);
