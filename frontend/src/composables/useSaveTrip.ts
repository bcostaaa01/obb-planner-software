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
    const tripData = {
      startstation: trip.startstation,
      endstation: trip.endstation,
      starttime: trip.starttime,
      endtime: trip.endtime,
      price: trip.price,
      passengercount: trip.passenger?.count,
      passengertype: trip.passenger?.type,
      passengerdiscount: trip.passenger?.discount,
      segments: trip.segments,
      date: trip.date,
    };

    const { data, error } = await supabase
      .from("user_trips")
      .insert(tripData)
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
