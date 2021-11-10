import axios, { AxiosResponse } from "axios";
import { Booking } from "../models/booking";

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, {headers: {'Content-Type': 'application/json'}}).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, {headers: {'Content-Type': 'application/json'}}).then(responseBody),
}

const Bookings = {
    list: () => requests.get<Booking[]>('/Booking'),
    details: (id: string) => requests.get<Booking>(`/Booking/${id}`),
    create: (booking: Booking) => { console.log(booking); return requests.post<void>('/Booking', booking); },
    update: (booking: Booking) => requests.put<void>(`/Booking/${booking.id}`, booking)
}

const agent = {
    Bookings
}

export default agent;