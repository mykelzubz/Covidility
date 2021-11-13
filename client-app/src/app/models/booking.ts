export interface Booking {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    testType: string;
    location: string;
    testDate: Date | null;
    result: string;
    bookingStatus: string;
    bookingDate: string;
}