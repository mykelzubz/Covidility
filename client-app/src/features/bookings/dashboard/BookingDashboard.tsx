import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Booking } from "../../../app/models/booking";
import { useStore } from "../../../app/stores/store";
import BookingDetails from "../details/BookingDetails";
import BookingForm from "../form/BookingForm";
import BookingList from "./BookingList";

export default observer( function BookingDashboard() {

  const {bookingStore} = useStore();
  const {selectedBooking, editMode} = bookingStore;

  useEffect(() => {
    bookingStore.loadBookings();
  }, [bookingStore]);

  if (bookingStore.loadingInitial) return <LoadingComponent content="Loading app..." />;
  
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
