import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";
import { useStore } from "../../../app/stores/store";

export default observer( function BookingForm() {

  const {bookingStore} = useStore();
  const {selectedBooking, createBooking, loading} = bookingStore;
  const initialState = selectedBooking ?? {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    testType: "",
    location: "",
    testDate: "",
    result: "",
    bookingStatus: "PENDING",
    bookingDate: new Date().toISOString()
  };

  const [booking, setBooking] = useState(initialState);

  function handleSubmit() {
    createBooking(booking);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  }

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
          floated="right"
          type="button"
          content="Cancel"
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
      </Form>
    </Segment>
  );
});
