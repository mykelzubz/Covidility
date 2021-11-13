import { createContext, useContext } from "react";
import BookingStore from "./bookingStore";
import CommonStore from "./commonStore";

interface Store {
    bookingStore: BookingStore;
    commonStore: CommonStore;
}

export const store: Store = {
    bookingStore: new BookingStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}