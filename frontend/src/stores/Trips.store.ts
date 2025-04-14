import { defineStore } from "pinia";
import { ref } from "vue";
import type { ExtendedTrip, Trip } from "../types/Trip";
import supabase from "../composables/useSupabaseConfig";

export const useTripsStore = defineStore("trips", () => {
  const trips = ref<ExtendedTrip[]>([]);
  const selectedTrip = ref<Trip | null>(null);
  const cart = ref<Trip[]>([]);

  const saveTrip = (trip: ExtendedTrip) => {
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

      const { data: updates, error: updatesError } = await supabase
        .from("notifications")
        .select("*")
        .eq("trip_id", data[0].id);

      if (updatesError) {
        console.error("Error fetching updates:", updatesError);
        return [];
      }

      trips.value = data.map((trip) => ({
        ...trip,
        updates: updates.filter((update) => update.trip_id === trip.id),
      }));
      return trips.value;
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
