import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Booking } from "../models/booking";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string') {
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if(data.errors) {
                const modalStateErrors = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    
        default:
            break;
    }
    return Promise.reject(error);
})

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