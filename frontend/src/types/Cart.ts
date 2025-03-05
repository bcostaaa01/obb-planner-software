import type { Trip } from "./Trip";

export interface Cart {
    trips: Trip[];
    totalPrice: number;
}

export interface Passenger {
    count: number;
    type: string;
    discount: string;
}

export interface PassengerInfo {
    passenger: Passenger;
    oneWayJourney: boolean;
}


