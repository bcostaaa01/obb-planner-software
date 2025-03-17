import { ref } from "vue";
import { useI18n } from "vue-i18n";

export function useValidateInputs() {
  const { t } = useI18n();
  const errors = ref({
    email: "",
    password: "",
    firstName: "",
    startStation: "",
    endStation: "",
    selectedDate: "",
    passengerCount: "",
  });

  const validateAuthInputs = (
    email: string,
    password: string,
    firstName: string,
    isLogin: boolean
  ) => {
    errors.value.email = email ? "" : t("auth.validation.email");
    errors.value.password = password ? "" : t("auth.validation.password");
    if (!isLogin) {
      errors.value.firstName = firstName ? "" : t("auth.validation.firstName");
    }
    return (
      !errors.value.email &&
      !errors.value.password &&
      (!isLogin ? !errors.value.firstName : true)
    );
  };

  const validateTripInputs = (
    startStation: string,
    endStation: string,
    selectedDate: string,
    passengerCount: number
  ) => {
    errors.value.startStation = startStation
      ? ""
      : t("trip-planner.please-select-stations");
    errors.value.endStation = endStation
      ? ""
      : t("trip-planner.please-select-stations");
    errors.value.selectedDate = selectedDate
      ? ""
      : t("trip-planner.please-select-date");
    errors.value.passengerCount =
      passengerCount > 0 ? "" : t("trip-planner.please-select-passenger");
    if (startStation === endStation) {
      errors.value.startStation = t("trip-planner.same-station-error");
      errors.value.endStation = t("trip-planner.same-station-error");
    }
    return (
      !errors.value.startStation &&
      !errors.value.endStation &&
      !errors.value.selectedDate &&
      !errors.value.passengerCount
    );
  };

  return { errors, validateAuthInputs, validateTripInputs };
}
