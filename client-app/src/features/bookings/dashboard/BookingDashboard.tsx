import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Booking } from "../../../app/models/booking";
import { useStore } from "../../../app/stores/store";
import BookingDetails from "../details/BookingDetails";
import BookingForm from "../form/BookingForm";
import BookingList from "./BookingList";

export default observer( function BookingDashboard() {

  const {bookingStore} = useStore();
  const {selectedBooking, editMode} = bookingStore;
  return (
    <Grid>
      <Grid.Column width="7">
        <div style={{ maxHeight: "500px", overflow: "scroll" }}>
          <BookingList />
        </div>
      </Grid.Column>

      <Grid.Column width="9">
        {selectedBooking && !editMode && (
          <BookingDetails />
        )}
        {editMode && (
          <BookingForm />
        )}
      </Grid.Column>
    </Grid>
  );
});
