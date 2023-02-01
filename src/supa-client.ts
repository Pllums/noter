import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// const supabaseUrl = (import.meta as any).env.SUPABASE_API_URL;
const supabaseUrl = "http://localhost:3000";
// const supabaseKey = (import.meta as any).env.SUPABASE_ANON_KEY;
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

supabaseClient
	.from("user_profiles")
	.select("*")
	.then(({ data }) => {});
