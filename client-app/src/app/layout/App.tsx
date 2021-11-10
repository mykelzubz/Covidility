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
import { Route } from "react-router";
import HomePage from "../../features/home/HomePage";
import BookingForm from "../../features/bookings/form/BookingForm";
import BookingDetails from "../../features/bookings/details/BookingDetails";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/bookings" component={BookingDashboard} />
        <Route path="/bookings/:id" component={BookingDetails} />
        <Route path="/createBooking" component={BookingForm} />
      </Container>
    </>
  );
}

export default observer(App);
