import { defineStore } from "pinia";
import { ref } from "vue";
import type { Trip } from "../types/Trip";

export const useTripsStore = defineStore("trips", () => {
  const trips = ref<Trip[]>([]);
  const selectedTrip = ref<Trip | null>(null);
  const cart = ref<Trip[]>([]);

  const saveTrip = (trip: Trip) => {
    console.log("saveTrip", trip);
    trips.value.push(trip);
  };

  const addTripToCart = (trip: Trip) => {
    cart.value.push(trip);
  };

  const setSelectedTrip = (trip: Trip) => {
    selectedTrip.value = trip;
  };

  const getTrips = () => {
    return trips.value;
  };

  const getCart = () => {
    return cart.value;
  };

  const getTotalPrice = () => {
    return cart.value.reduce((acc, trip) => acc + (trip.price || 0), 0);
  };

  return { trips, selectedTrip, saveTrip, getTrips, setSelectedTrip, cart, addTripToCart, getCart, getTotalPrice };
});
