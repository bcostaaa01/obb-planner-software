import { defineStore } from "pinia";
import { ref } from "vue";
import type { Trip } from "../types/Trip";
import supabase from "../composables/useSupabaseConfig";

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

  const fetchUserTrips = async () => {
    try {
      const { data, error } = await supabase.from("user_trips").select("*");

      if (error) {
        console.error("Error fetching trips:", error);
        return [];
      }

      trips.value = data;
      return data;
    } catch (error) {
      console.error("Error fetching trips:", error);
      return [];
    }
  };

  const removeTripFromDatabase = async (tripId: string) => {
    const { data, error } = await supabase
      .from("user_trips")
      .delete()
      .eq("id", tripId);

    if (error) {
      console.error("Error deleting trip:", error);
    }

    return data;
  };

  return {
    trips,
    selectedTrip,
    saveTrip,
    getTrips,
    setSelectedTrip,
    cart,
    addTripToCart,
    getCart,
    getTotalPrice,
    fetchUserTrips,
    removeTripFromDatabase,
  };
});
