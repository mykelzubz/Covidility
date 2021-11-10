import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Booking } from "../models/booking";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default class BookingStore {
    bookingRegistry = new Map<string, Booking>();
    selectedBooking: Booking | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get bookingsByDate() {
        return Array.from(this.bookingRegistry.values()).sort((a, b) =>
            Date.parse(a.bookingDate) - Date.parse(b.bookingDate));
    }

    loadBookings = async () => {
        try {
            const bookings = await agent.Bookings.list();

            bookings.forEach((booking) => {
                this.setBooking(booking);
            });
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);

        }
    }

    loadBooking = async (id: string) => {
        let booking = this.getBooking(id);
        if(booking) {
            this.selectedBooking = booking;
        } else {
            this.loadingInitial = true;
            try {
                booking = await agent.Bookings.details(id);
                this.setBooking(booking);
                this.setLoadingInitial(false)
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false)
            }
        }
    }

    private setBooking = (booking: Booking) => {
        booking.testDate = booking.testDate.split("T")[0];
        this.bookingRegistry.set(booking.id, booking);
    }

    private getBooking = (id: string) => {
        return this.bookingRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBooking = async (booking: Booking) => {

        this.loading = true;
        booking.id = uuid();
        console.log('inside create')
        console.log(booking)
        try {
            //await agent.Bookings.create(booking);
            await axios
                .post("http://localhost:5000/api/Booking", booking)
                .then(function (response) {

                })
                .catch(function (error) {
                    console.log(error);
                });
            runInAction(() => {
                this.bookingRegistry.set(booking.id, booking);
                this.selectedBooking = booking;
                this.editMode = false;
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}