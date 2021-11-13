import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import BookingList from "./BookingList";

export default observer( function BookingDashboard() {

  const {bookingStore} = useStore();
  const {loadBookings, bookingRegistry} = bookingStore;

  useEffect(() => {
    if(bookingRegistry.size <= 1) loadBookings();
  }, [bookingRegistry.size, loadBookings]);

  if (bookingStore.loadingInitial) return <LoadingComponent content="Loading bookings..." />;

  return (
    <Grid>
      <Grid.Column width="7">
        <div style={{ maxHeight: "500px", overflow: "scroll" }}>
          <BookingList />
        </div>
      </Grid.Column>

      <Grid.Column width="9">
      </Grid.Column>
    </Grid>
  );
});
