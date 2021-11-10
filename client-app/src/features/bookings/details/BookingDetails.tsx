import React from "react";
import { Button, Card, Label } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function BookingDetails() {

  const {bookingStore} = useStore();
  const {selectedBooking: booking, openForm, cancelSelectedBooking} = bookingStore;

  if(!booking) return <LoadingComponent content='No booking...' />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {booking.firstName} {booking.lastName}
        </Card.Header>
        <Card.Meta>{booking.email}</Card.Meta>
        <Card.Description>
          <div>
            <strong>Location:</strong> {booking.location}
          </div>
          <div>
            <strong>Test Date:</strong> {booking.testDate}
          </div>
          <div>
            <strong>Test Type:</strong> {booking.testType}
          </div>
          <div>
            <strong>Test Result:</strong> {booking.result}
          </div>
          <div>
            <strong>Date of Booking:</strong> {booking.bookingDate}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={cancelSelectedBooking}
          basic
          floated="right"
          color="red"
          content="Close"
        />

        {booking.bookingStatus === "PENDING" ? (
          <Button
            floated="right"
            color="red"
            content="Cancel Booking"
          />
        ) : (
          ""
        )}

        <Label basic content={booking.bookingStatus} />
      </Card.Content>
    </Card>
  );
}
