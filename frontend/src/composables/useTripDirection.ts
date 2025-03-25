import { ref, computed } from "vue";
import type { ExtendedTrip, Trip } from "../types/Trip";
import { useSaveTrip } from "./useSaveTrip";
import { mockTrips } from "../mocks/trips";

export function useTripDirection() {
  const { savedTrip, setAvailableTrips, simulateLoading } = useSaveTrip();
  const isReversed = ref(false);
  const isLoading = ref(false);

  const currentDeparture = computed(() => {
    if (!savedTrip.value) return "";
    return isReversed.value
      ? savedTrip.value.endstation
      : savedTrip.value.startstation;
  });

  const currentDestination = computed(() => {
    if (!savedTrip.value) return "";
    return isReversed.value
      ? savedTrip.value.startstation
      : savedTrip.value.endstation;
  });

  const toggleDirection = () => {
    isReversed.value = !isReversed.value;
    simulateLoading(updateAvailableTrips);
  };

  const updateAvailableTrips = () => {
    if (!savedTrip.value) return;
    isLoading.value = true;

    const routeKey = isReversed.value
      ? `${savedTrip.value.endstation}-${savedTrip.value.startstation}`
      : `${savedTrip.value.startstation}-${savedTrip.value.endstation}`;

    const date = savedTrip.value.date;

    // Check if we have trips for this date
    if (mockTrips[date] && mockTrips[date][routeKey]) {
      setAvailableTrips(mockTrips[date][routeKey] as unknown as ExtendedTrip[]);
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
