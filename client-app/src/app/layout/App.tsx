import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import BookingDashboard from "../../features/bookings/dashboard/BookingDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import BookingForm from "../../features/bookings/form/BookingForm";
import BookingDetails from "../../features/bookings/details/BookingDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-center" hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bookings" component={BookingDashboard} />
          <Route path="/bookings/:id" component={BookingDetails} />
          <Route
            key={location.key}
            path="/createBooking"
            component={BookingForm}
          />
          <Route path="/errors" component={TestErrors} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
