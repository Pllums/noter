import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = (import.meta as any).env.SUPABASE_API_URL;
const supabaseKey = (import.meta as any).env.SUPABASE_ANON_KEY;

export const supabaseClient = createClient<Database>(supabaseKey, supabaseUrl);

supabaseClient
	.from("user_profiles")
	.select("*")
	.then(({ data }) => {});
