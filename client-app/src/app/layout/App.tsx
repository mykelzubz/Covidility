import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import BookingDashboard from "../../features/bookings/dashboard/BookingDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import BookingForm from "../../features/bookings/form/BookingForm";
import BookingDetails from "../../features/bookings/details/BookingDetails";

function App() {
const location = useLocation();

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/bookings" component={BookingDashboard} />
        <Route path="/bookings/:id" component={BookingDetails} />
        <Route key={location.key} path="/createBooking" component={BookingForm} />
      </Container>
    </>
  );
}

export default observer(App);
