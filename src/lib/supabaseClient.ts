import { createClient } from "@supabase/supabase-js";

// En un proyecto Lovable conectado a Supabase, estas dos variables las
// inyecta la plataforma automáticamente. Son públicas por diseño (la
// "anon key" no da acceso a nada sensible por sí sola): lo que protege el
// informe es el secreto ANTHROPIC_API_KEY, que vive solo del lado de la
// Edge Function y nunca llega al navegador.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. La generación del informe no va a funcionar hasta conectar Supabase."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
