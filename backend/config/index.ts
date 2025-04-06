export const config = {
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
};

// Validation
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} is not defined`);
  }
});
