import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "../composables/useSupabaseConfig";
import type { User } from "../auth/User";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getUser = async () => {
    if (user.value) return user.value;

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: supaError } = await supabase.auth.getUser();

      if (supaError) throw supaError;

      user.value = data.user;
      return data.user;
    } catch (e) {
      error.value = "Failed to fetch user";
      return null;
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

  return { user, getUser, isLoading, error };
});
