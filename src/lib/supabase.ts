import { createClient } from "@supabase/supabase-js";

/**
 * Project: study-skills-center (ap-south-1 / Mumbai), free tier.
 *
 * These two values are safe to commit and ship in the client bundle — that's
 * what a Supabase "publishable" key is *for*. It has no power on its own;
 * every table it can touch is governed by Row Level Security policies set on
 * the database side (see the `create_leads_table` migration). The publishable
 * key can insert a lead; it cannot read, update or delete one — there is no
 * policy granting that, so the default is deny.
 */
const SUPABASE_URL = "https://sviomjiythfihktwlnop.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_7bwYZzZoAbbO5Q1vGQAHgg_5JsAzvyV";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type LeadInsert = {
  student_name: string;
  parent_name: string;
  phone: string;
  class_or_age: string | null;
  programme: string | null;
  message: string | null;
  consent: boolean;
  source: string;
};
