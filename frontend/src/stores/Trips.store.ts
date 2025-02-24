import { defineStore } from "pinia";
import { ref } from "vue";
import type { Trip } from "../types/Trip";

export const useTripsStore = defineStore("trips", () => {
  const trips = ref<Trip[]>([]);
  const selectedTrip = ref<Trip | null>(null);

  const saveTrip = (trip: Trip) => {
    trips.value.push(trip);
  };

  const setSelectedTrip = (trip: Trip) => {
    selectedTrip.value = trip;
  };

  const getTrips = () => {
    return trips.value;
  };

  return { trips, selectedTrip, saveTrip, getTrips, setSelectedTrip };
});
