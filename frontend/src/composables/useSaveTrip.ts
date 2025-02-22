import { useTripsStore } from "../stores/Trips.store";
import type { Trip } from "../types/Trip";

export const useSaveTrip = () => {
  const tripsStore = useTripsStore();

  const saveTrip = (trip: Trip) => {
    tripsStore.saveTrip(trip);
  };

  return { saveTrip };
};
