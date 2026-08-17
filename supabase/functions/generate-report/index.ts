// Supabase Edge Function (Deno). Reemplaza al servidor Express: es la única
// pieza que conoce la llave de la API de Claude, guardada como secreto de
// Supabase (nunca queda expuesta en el navegador). Lovable despliega
// automáticamente todo lo que esté dentro de supabase/functions/ cuando el
// proyecto está conectado a Supabase.
import { SYSTEM_PROMPT, buildUserMessage, type ReportRequestPayload } from "./systemPrompt.ts";

const ANTHROPIC_MODEL = Deno.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5";
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// deno-lint-ignore no-explicit-any
function isValidPayload(body: any): body is ReportRequestPayload {
  return (
    body &&
    typeof body.intake?.companyName === "string" &&
    body.intake.companyName.length > 0 &&
    body.intake.companyName.length < 200 &&
    typeof body.intake?.industry === "string" &&
    typeof body.intake?.companySize === "string" &&
    body.scoring &&
    Array.isArray(body.scoring.categoryScores) &&
    typeof body.scoring.globalScore === "number" &&
    body.scoring.level &&
    typeof body.scoring.level.name === "string"
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!ANTHROPIC_API_KEY) {
    return jsonResponse({ error: "Falta configurar el secreto ANTHROPIC_API_KEY en Supabase." }, 500);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Cuerpo de la solicitud inválido." }, 400);
  }

  if (!isValidPayload(payload)) {
    return jsonResponse({ error: "Datos de diagnóstico inválidos." }, 400);
  }

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1800,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserMessage(payload) }],
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      console.error("Error de la API de Claude:", anthropicRes.status, errBody);
      return jsonResponse({ error: "No se pudo generar el informe en este momento." }, 502);
    }

    const data = await anthropicRes.json();
    const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
    const report = textBlock?.text ?? "";

    if (!report) {
      return jsonResponse({ error: "La API de Claude no devolvió contenido." }, 502);
    }

    return jsonResponse({ report });
  } catch (err) {
    console.error("Error generando informe:", err);
    return jsonResponse({ error: "No se pudo generar el informe en este momento." }, 502);
  }
});
