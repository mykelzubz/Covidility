import React from "react";
import { Grid } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";
import BookingDetails from "../details/BookingDetails";
import BookingForm from "../form/BookingForm";
import BookingList from "./BookingList";

interface Props {
  bookings: Booking[];
  selectedBooking: Booking | undefined;
  selectBooking: (id: string) => void;
  cancelSelectBooking: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createBooking: (booking: Booking) => void;
  submitting: boolean;
}

export default function BookingDashboard({
  bookings,
  selectedBooking,
  selectBooking,
  cancelSelectBooking,
  editMode,
  openForm,
  closeForm,
  createBooking,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="7">
        <BookingList bookings={bookings} selectBooking={selectBooking} />
      </Grid.Column>

      <Grid.Column width="9">
        {selectedBooking && !editMode && (
          <BookingDetails
            booking={selectedBooking}
            cancelSelectBooking={cancelSelectBooking}
            openForm={openForm}
          />
        )}
        {editMode && (
          <BookingForm
            closeForm={closeForm}
            booking={selectedBooking}
            createBooking={createBooking}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
