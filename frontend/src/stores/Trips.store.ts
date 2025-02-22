import { defineStore } from "pinia";
import { ref } from "vue";
import type { Trip } from "../types/Trip";

export const useTripsStore = defineStore("trips", () => {
  const trips = ref<Trip[]>([]);

  const saveTrip = (trip: Trip) => {
    trips.value.push(trip);
  };

  const getTrips = () => {
    return trips.value;
  };

  return { trips, saveTrip, getTrips };
});
