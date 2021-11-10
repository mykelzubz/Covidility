import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function BookingForm() {
  const history = useHistory();
  const { bookingStore } = useStore();
  const { createBooking, loading, loadingInitial } = bookingStore;
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    testType: "",
    location: "",
    testDate: "",
    result: "",
    bookingStatus: "PENDING",
    bookingDate: new Date().toISOString(),
  });

  function handleSubmit() {
    if(booking.id.length === 0) {
      let newBooking = {
        ...booking,
        id: uuid()
      }
      createBooking(newBooking).then(() => history.push(`/bookings/${newBooking.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  }

  if(loadingInitial) return <LoadingComponent content='Loading booking...' />

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          label="First Name"
          placeholder="First Name"
          value={booking.firstName}
          name="firstName"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Last Name"
          placeholder="Last Name"
          value={booking.lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          value={booking.email}
          name="email"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Test Type"
          placeholder="Test Type"
          value={booking.testType}
          name="testType"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Location"
          placeholder="Location"
          value={booking.location}
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Test Date"
          type="date"
          placeholder="Test Date"
          value={booking.testDate}
          name="testDate"
          onChange={handleInputChange}
        />

        <Button
          as={Link}
          to="/bookings"
          floated="right"
          type="button"
          content="Cancel"
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
      </Form>
    </Segment>
  );
});
