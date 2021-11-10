import { createContext, useContext } from "react";
import BookingStore from "./bookingStore";

interface Store {
    bookingStore: BookingStore
}

export const store: Store = {
    bookingStore: new BookingStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}