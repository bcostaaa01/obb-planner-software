import { ref } from "vue";
import type { Trip, ExtendedTrip, SearchedTrip } from "../types/Trip";

const savedTrip = ref<SearchedTrip | null>(null);
const selectedTrip = ref<Trip | null>(null);
const availableTrips = ref<ExtendedTrip[]>([]);
const isLoading = ref(false);

export function useSaveTrip() {
  const saveTrip = (trip: SearchedTrip) => {
    savedTrip.value = trip;
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
