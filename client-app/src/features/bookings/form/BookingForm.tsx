import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";

interface Props {
  booking: Booking | undefined;
  closeForm: () => void;
  createBooking: (booking: Booking) => void;
}

export default function BookingForm({
  booking: selectedBooking,
  closeForm, createBooking
}: Props) {
  const initialState = selectedBooking ?? {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    testType: '',
    location: '',
    testDate: '',
    result: '',
    bookingStatus: 'PENDING',
    bookingDate: ''
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
          placeholder="First Name"
          value={booking.firstName}
          name="firstName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Last Name"
          value={booking.lastName}
          name="lastName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Email"
          value={booking.email}
          name="email"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Test Type"
          value={booking.testType}
          name="testType"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Location"
          value={booking.location}
          name="location"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Test Date"
          value={booking.testDate}
          name="testDate"
          onChange={handleInputChange}
        />

        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
        <Button floated="right" positive type="submit" content="Submit" />
      </Form>
    </Segment>
  );
}
