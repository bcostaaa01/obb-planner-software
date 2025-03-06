import { computed } from "vue";

export function useTimeFormat(time: string) {
  return {
    hours: computed(() => time.slice(0, 2)),
    minutes: computed(() => time.slice(3, 5)),
  };
}
