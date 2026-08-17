import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserMessage, type ReportRequestPayload } from "./systemPrompt";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();
app.use(express.json({ limit: "200kb" }));

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

app.post("/api/generate-report", async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "El servidor no tiene configurada ANTHROPIC_API_KEY." });
    return;
  }

  if (!isValidPayload(req.body)) {
    res.status(400).json({ error: "Datos de diagnóstico inválidos." });
    return;
  }

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1800,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(req.body) }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const report = textBlock && "text" in textBlock ? textBlock.text : "";

    if (!report) {
      res.status(502).json({ error: "La API de Claude no devolvió contenido." });
      return;
    }

    res.json({ report });
  } catch (err) {
    console.error("Error generando informe:", err);
    res.status(502).json({ error: "No se pudo generar el informe en este momento." });
  }
});

if (process.env.NODE_ENV === "production") {
  const distDir = path.resolve(__dirname, "../dist");
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API lista en http://localhost:${PORT}`);
});
