import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqfuvgthhggrpnojkone.supabase.co";
const supabaseKey = "sb_publishable_3EkcTYLu-HRZwioM-Gvuxg_e4aBmCAT";

export const supabase = createClient(supabaseUrl, supabaseKey);