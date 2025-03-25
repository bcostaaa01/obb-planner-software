import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "../composables/useSupabaseConfig";
import type { User } from "../auth/User";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  const getUser = async () => {
    isLoading.value = true;
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return null;
      }

      user.value = data.user;
      return data.user;
    } finally {
      isLoading.value = false;
    }
  };

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      getUser();
    } else if (event === "SIGNED_OUT") {
      user.value = null;
    }
  });

  return { user, getUser, isLoading };
});
