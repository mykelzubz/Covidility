import React from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";

interface Props {
  booking: Booking;
}

export default function BookingDetails({ booking }: Props) {
  return (
    <Card fluid>
      {/* <Image src="/images/avatar/large/matthew.png" wrapped ui={false} /> */}
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
        {booking.bookingStatus !== "CANCELLED" ? (
          <Button basic floated="right" color="red" content="Cancel Booking" />
        ) : (
          ""
        )}

        <Label basic content={booking.bookingStatus} />
      </Card.Content>
    </Card>
  );
}
