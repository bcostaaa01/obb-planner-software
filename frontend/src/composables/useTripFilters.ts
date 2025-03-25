import { ref } from "vue";

export function useTripFilters() {
  const bestFareChecked = ref(false);
  const filtersChecked = ref(false);

  const toggleBestFare = () => {
    bestFareChecked.value = !bestFareChecked.value;
  };

  const toggleFilters = () => {
    filtersChecked.value = !filtersChecked.value;
  };

  return {
    bestFareChecked,
    filtersChecked,
    toggleBestFare,
    toggleFilters,
  };
}
