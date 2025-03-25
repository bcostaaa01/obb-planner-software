import { computed } from "vue";
import { useUserStore } from "../stores/User.store";

export const useUserAvatar = () => {
  const userStore = useUserStore();

  const avatar = computed(() => {
    try {
      const user = userStore.user;
      const firstName = user?.user_metadata?.first_name;

      if (!firstName || firstName.trim() === "") {
        return "?";
      }

      return firstName.charAt(0).toUpperCase();
    } catch (e) {
      return "!";
    }
  });

  return {
    avatar,
    isLoading: computed(() => userStore.isLoading),
  };
};
