import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "../composables/useSupabaseConfig";
import type { User } from "../auth/User";

interface UserData {
  first_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  country: string;
  discount: string;
  passenger_type: string;
}

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const user = ref<User | null>(null);

  async function loadUserData() {
    try {
      loading.value = true;
      error.value = null;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error: fetchError } = await supabase
        .from("user_data")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) throw fetchError;
      userData.value = data;
      return data;
    } catch (catchError) {
      error.value =
        catchError instanceof Error
          ? catchError.message
          : "Failed to load user data";
      throw catchError;
    } finally {
      loading.value = false;
    }
  }

  async function saveUserData(userDataInput: Partial<UserData>) {
    try {
      loading.value = true;
      error.value = null;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data, error: upsertError } = await supabase
        .from("user_data")
        .upsert({
          id: user.id,
          ...userDataInput,
        })
        .select()
        .single();

      if (upsertError) throw upsertError;
      userData.value = data;
      return data;
    } catch (catchError) {
      error.value =
        catchError instanceof Error
          ? catchError.message
          : "Failed to save user data";
      throw catchError;
    } finally {
      loading.value = false;
    }
  }

  const getUser = async () => {
    isLoading.value = true;

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;
      user.value = data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    userData,
    loading,
    error,
    isLoading,
    user,
    loadUserData,
    saveUserData,
    getUser,
  };
});
