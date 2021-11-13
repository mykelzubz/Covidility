import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { testTypeOptions } from "../../../app/common/options/testTypeOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Booking } from "../../../app/models/booking";

export default observer(function BookingForm() {
  const history = useHistory();
  const { bookingStore } = useStore();
  const { createBooking, loading, loadingInitial } = bookingStore;
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<Booking>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    testType: "",
    location: "",
    testDate: null,
    result: "",
    bookingStatus: "PENDING",
    bookingDate: new Date().toISOString(),
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email(),
    testType: Yup.string().required("Test Type is required"),
    location: Yup.string().required("Location is required"),
    testDate: Yup.date().required("Test Date is required").nullable(),
  });

  function handleFormSubmit(booking: Booking) {
    if (booking.id.length === 0) {
      let newBooking = {
        ...booking,
        id: uuid(),
      };
      createBooking(newBooking).then(() =>
        history.push(`/bookings/${newBooking.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading booking..." />;

  return (
    <Segment clearing>
      <Header content="Booking Details" color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={booking}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <MyTextInput
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
            />
            <MyTextInput label="Email" placeholder="Email" name="email" />
            <MySelectInput
              options={testTypeOptions}
              label="Test Type"
              placeholder="Test Type"
              name="testType"
            />
            <MyTextInput
              label="Location"
              placeholder="Location"
              name="location"
            />
            <MyDateInput
              placeholderText="Test Date"
              name="testDate"
              dateFormat="yyyy-MM-dd"
            />

            <Button
              as={Link}
              to="/bookings"
              floated="right"
              type="button"
              content="Cancel"
            />
            <Button
              disabled={!isValid || isSubmitting || !dirty}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
