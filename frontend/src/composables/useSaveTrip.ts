import { ref } from "vue";
import type { Trip, ExtendedTrip, SearchedTrip } from "../types/Trip";
import supabase from "./useSupabaseConfig";

const savedTrip = ref<SearchedTrip | null>(null);
const selectedTrip = ref<Trip | null>(null);
const availableTrips = ref<ExtendedTrip[]>([]);
const isLoading = ref(false);

export function useSaveTrip() {
  const saveTrip = (trip: SearchedTrip) => {
    savedTrip.value = trip;
  };

  const addTripToCheckoutDB = async (trip: Trip) => {
    const { data, error } = await supabase
      .from("user_trips")
      .insert({
        start_station: trip.startStation,
        end_station: trip.endStation,
        start_time: trip.startTime,
        end_time: trip.endTime,
        price: trip.price,
        passenger_count: trip.passenger?.count,
        passenger_type: trip.passenger?.type,
        passenger_discount: trip.passenger?.discount,
        segments: trip.segments,
        date: trip.date,
      })
      .select();

    if (error) {
      console.error(error);
    }

    return data;
  };

  const setSelectedTrip = (trip: Trip) => {
    selectedTrip.value = trip;
  };

  const setAvailableTrips = (trips: ExtendedTrip[]) => {
    availableTrips.value = trips;
  };

  const getAvailableTrips = () => {
    return availableTrips.value;
  };

  const setIsLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const getIsLoading = () => {
    return isLoading.value;
  };

  const simulateLoading = async (callback: () => void, delay = 2000) => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        callback();
        setIsLoading(false);
        resolve();
      }, delay);
    });
  };

  return {
    saveTrip,
    addTripToCheckoutDB,
    setSelectedTrip,
    setAvailableTrips,
    getAvailableTrips,
    simulateLoading,
    savedTrip,
    selectedTrip,
    availableTrips,
    isLoading,
    setIsLoading,
    getIsLoading,
  };
}
