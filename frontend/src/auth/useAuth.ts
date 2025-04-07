import { ref } from "vue";
import supabase from "../composables/useSupabaseConfig";
import type { User } from "./User";

export const useAuth = () => {
  const user = ref<User | null>(null);
  const isLoading = ref(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      user.value = data.user as unknown as User;
      isLoading.value = false;
      sessionStorage.setItem("user", JSON.stringify(user.value));
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
    window.location.reload();
  };

  const signUp = async (firstName: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
          },
        },
      });
      if (error) throw error;
      user.value = data.user as unknown as User;
      isLoading.value = false;
      sessionStorage.setItem("user", JSON.stringify(user.value));
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
    window.location.reload();
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
      isLoading.value = false;
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
    window.location.reload();
  };

  const checkAuth = async () => {
    const userSessionStorage = sessionStorage.getItem("user");
    if (userSessionStorage) {
      user.value = JSON.parse(userSessionStorage) as User;
    }
    isLoading.value = false;
  };

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error) throw error;
    return data.user;
  };

  return { user, isLoading, signIn, signOut, checkAuth, signUp, getUser };
};
