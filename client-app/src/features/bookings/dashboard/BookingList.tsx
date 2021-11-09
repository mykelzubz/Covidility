import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";

interface Props {
  bookings: Booking[];
  selectBooking: (id: string) => void;
}

export default function BookingList({ bookings, selectBooking }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {bookings.map((booking) => (
          <Item key={booking.id}>
            <Item.Content>
              <Item.Header as="a">
                {booking.firstName} {booking.lastName}
              </Item.Header>
              <Item.Meta>{booking.email}</Item.Meta>
              {/* <Item.Description>
                <div><strong>Location:</strong> {booking.location}</div>
                <div><strong>Test Date:</strong> {booking.testDate}</div>
                <div><strong>Test Type:</strong> {booking.testType}</div>
                <div><strong>Test Result:</strong> {booking.result}</div>
              </Item.Description> */}
              <Item.Extra>
                <Button onClick={() => selectBooking(booking.id)} floated="right" content="View" color="black"></Button>
                <Label basic content={booking.bookingStatus} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
