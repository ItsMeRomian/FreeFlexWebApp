import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDAxNjgwNiwiZXhwIjoxOTM5NTkyODA2fQ.ts4Kie-Yid5Y_f3YXE5UoVO6m34JnFr7Lya0JLad5U8";
export default ({ app }, inject) => {
  const supabaseUrl = "https://anxoehcshvbekwyqroki.supabase.co";
  const supabaseKey = SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  inject("supabase", supabase);
};
