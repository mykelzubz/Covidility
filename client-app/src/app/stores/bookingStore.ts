import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Booking } from "../models/booking";
import axios from "axios";
import { Console } from "console";

export default class BookingStore {
    bookingRegistry = new Map<string, Booking>();
    selectedBooking: Booking | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get bookingsByDate() {
        return Array.from(this.bookingRegistry.values()).sort((a, b) =>
            Date.parse(a.bookingDate) - Date.parse(b.bookingDate));
    }

    loadBookings = async () => {
        try {
            this.setLoadingInitial(true);
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
            return booking;
        } else {
            //this.loadingInitial = true;
            this.setLoadingInitial(true);
            try {
                booking = await agent.Bookings.details(id);
                this.setBooking(booking);
                runInAction(() => {
                    this.selectedBooking = booking;
                });                
                this.setLoadingInitial(false);
                return booking;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setBooking = (booking: Booking) => {
        const dateString = new Date(booking.testDate!).toISOString().split('T')[0]; //format(booking.testDate!, 'yyyy-MM-dd');
        booking.testDate = new Date(dateString) //booking.testDate.split("T")[0];
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
        console.log('the payload');
        console.log(booking);
        try {
            await agent.Bookings.create(booking).catch(function (error) {
                        console.log(error);
                    });
            // await axios
            //     .post("http://localhost:5000/api/Booking", booking)
            //     .then(function (response) {

            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

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