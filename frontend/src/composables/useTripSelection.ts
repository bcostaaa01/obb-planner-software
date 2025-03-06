import { useRouter } from "vue-router";
import type { ExtendedTrip } from "../types/Trip";
import { useSaveTrip } from "./useSaveTrip";

export function useTripSelection() {
  const router = useRouter();
  const { setSelectedTrip, savedTrip } = useSaveTrip();

  const selectTrip = (trip: ExtendedTrip) => {
    const tripWithPassenger = {
      ...trip,
      passenger: savedTrip.value?.passenger,
    };
    setSelectedTrip(tripWithPassenger);
    router.push("/trip-details");
  };

  return {
    selectTrip,
  };
}
