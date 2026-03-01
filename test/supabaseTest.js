import { supabase } from "../config/supabaseConfig";

export async function testSupabase() {
  const { data, error } = await supabase
    .from("test_table")
    .insert([{ message: "Supabase working!", time: new Date() }]);

  if (error) {
    console.log("Supabase Error:", error);
  } else {
    console.log("Supabase Working:", data);
  }
}
