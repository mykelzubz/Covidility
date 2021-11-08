import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";
import BookingDetails from "../details/BookingDetails";
import BookingList from "./BookingList";

interface Props {
  bookings: Booking[];
}

export default function BookingDashboard({ bookings }: Props) {
  return (
    <Grid>
      <Grid.Column width="7">
        <BookingList bookings={bookings} />
      </Grid.Column>

      <Grid.Column width="9">
        {bookings[1] && <BookingDetails booking={bookings[1]} />}
      </Grid.Column>
    </Grid>
  );
}
