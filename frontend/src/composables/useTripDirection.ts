import { ref, computed } from "vue";
import type { Trip } from "../types/Trip";
import { useSaveTrip } from "./useSaveTrip";
import { mockTrips } from "../types/trips";

export function useTripDirection() {
  const { savedTrip, setAvailableTrips, simulateLoading } = useSaveTrip();
  const isReversed = ref(false);
  const isLoading = ref(false);

  const currentDeparture = computed(() => {
    if (!savedTrip.value) return "";
    return isReversed.value
      ? savedTrip.value.endStation
      : savedTrip.value.startStation;
  });

  const currentDestination = computed(() => {
    if (!savedTrip.value) return "";
    return isReversed.value
      ? savedTrip.value.startStation
      : savedTrip.value.endStation;
  });

  const toggleDirection = () => {
    isReversed.value = !isReversed.value;
    simulateLoading(updateAvailableTrips);
  };

  const updateAvailableTrips = () => {
    if (!savedTrip.value) return;
    isLoading.value = true;

    const routeKey = isReversed.value
      ? `${savedTrip.value.endStation}-${savedTrip.value.startStation}`
      : `${savedTrip.value.startStation}-${savedTrip.value.endStation}`;

    if (mockTrips[routeKey]) {
      setAvailableTrips(mockTrips[routeKey]);
    } else {
      setAvailableTrips([]);
    }

    isLoading.value = false;
  };

  return {
    isReversed,
    isLoading,
    currentDeparture,
    currentDestination,
    toggleDirection,
    updateAvailableTrips,
  };
}
