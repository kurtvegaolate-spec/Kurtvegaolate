# Diagnóstico de Madurez Digital & IA — Tree Studio

Herramienta interactiva de diagnóstico: un ejecutivo responde un cuestionario breve
y recibe al instante un informe personalizado generado por IA, con su nivel de
madurez digital, brechas por dimensión y una invitación a conversar con Tree Studio.

## Cómo alojarlo en Lovable (ruta elegida)

Lovable no ejecuta un servidor Node/Express propio: importa proyectos
React + Vite y resuelve la lógica de backend con **Supabase Edge Functions**.
Por eso este repo está organizado en dos partes:

- `src/` — el frontend (React + Vite). Esto es lo que Lovable importa tal cual.
- `supabase/functions/generate-report/` — la función que llama a la API de
  Claude. Vive en Supabase, no en Lovable ni en el navegador.

Pasos:

1. **Importar el repo a Lovable.** En Lovable: *New project → Import from
   GitHub* y seleccionar este repositorio
   (`kurtvegaolate-spec/Kurtvegaolate`, rama con el diagnóstico). Lovable va a
   leer `src/` como el proyecto React/Vite.
2. **Conectar Supabase.** Dentro de Lovable, panel de integraciones →
   *Supabase* → Connect. Esto crea el proyecto de Supabase y setea
   automáticamente `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en el
   frontend — no hay que copiarlas a mano.
3. **Desplegar la función.** Con la [CLI de Supabase](https://supabase.com/docs/guides/cli)
   instalada y logueada:
   ```bash
   supabase link --project-ref <ref-del-proyecto-que-creó-lovable>
   supabase functions deploy generate-report
   ```
4. **Configurar el secreto de la llave de Claude** (nunca en el código ni en
   variables `VITE_*`, esas son públicas):
   ```bash
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   # opcional, por defecto usa claude-sonnet-5
   supabase secrets set ANTHROPIC_MODEL=claude-sonnet-5
   ```
5. Listo — el botón "Publish" de Lovable les da el link público.

## Cómo correrlo localmente (fuera de Lovable)

Requiere Node.js 20+ y la [CLI de Supabase](https://supabase.com/docs/guides/cli).

```bash
npm install

# Levantar Supabase local (incluye las Edge Functions) y el secreto de Claude
supabase start
supabase secrets set --env-file .env.local ANTHROPIC_API_KEY=sk-ant-...

# Frontend
cp .env.example .env.local
# completar VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY con lo que imprime `supabase start`
npm run dev
```

`npm run dev` levanta solo el frontend (`http://localhost:5173`); la función
corre por separado vía `supabase functions serve` si se quiere probar sin
desplegarla.

## Qué se construyó y por qué (resumen de decisiones)

**Stack:** React + TypeScript + Vite para el frontend, Tailwind para estilos,
Recharts para el gráfico radar, y una Supabase Edge Function como
intermediaria hacia la API de Claude. Sin base de datos: no la necesita un
MVP de una sola sesión, y así se evita toda la complejidad de configurar y
mantener una.

**¿Por qué una Edge Function y no llamar a Claude directo desde el
navegador?** La llave de la API (`ANTHROPIC_API_KEY`) nunca debe quedar
visible en el código que corre en el navegador del prospecto — cualquiera
podría inspeccionarlo y usarla para gastar el saldo de la cuenta. La función
la guarda como secreto de servidor y es la única que habla con Anthropic; el
navegador solo le pide "generame el informe" a través del cliente de
Supabase (`src/lib/supabaseClient.ts`).

> Nota de arquitectura: la primera versión de este proyecto usaba un
> servidor Express propio en vez de Supabase, porque es más simple de correr
> en cualquier lado (Render, Railway, un VPS). Se migró a Supabase Edge
> Functions específicamente porque es lo que Lovable sabe desplegar — Lovable
> no ejecuta servidores Node arbitrarios. La lógica es la misma en ambos
> casos, solo cambió dónde vive.

**Sin base de datos, con "link compartible":** las respuestas y los datos de
la empresa se codifican directamente en la URL (en `src/lib/shareLink.ts`).
Quien abre el link recalcula el puntaje al instante y se vuelve a generar el
informe. Es una limitación consciente del MVP: si más adelante quieren
guardar un historial de diagnósticos completados, ahí Supabase ya está
disponible para sumar una tabla real sin agregar otra pieza de
infraestructura.

**Exportar / imprimir:** se usa el diálogo de impresión nativo del navegador
(`window.print()`) con estilos que ocultan los botones y navegación
(`.no-print` en `src/index.css`). El usuario elige "Guardar como PDF" en ese
diálogo. Evita agregar una librería de generación de PDF solo para el MVP.

**Modelo de Claude usado:** el prompt original mencionaba `claude-sonnet-4-6`;
ese identificador no existe como modelo de la API. Se configuró
`claude-sonnet-5` (el modelo Sonnet vigente en este entorno) como valor por
defecto, ajustable sin tocar código vía el secreto `ANTHROPIC_MODEL`.

## El prompt de sistema del informe

Vive en `supabase/functions/generate-report/systemPrompt.ts`, en la
constante `SYSTEM_PROMPT`. Es lo que más vale la pena iterar a mano: define
el rol (Director de Tree Studio), el tono (español de Chile, formal, sin
frases genéricas de IA), y el formato exacto de salida (los 5 encabezados:
Resumen Ejecutivo, Diagnóstico por Dimensión, Quick Wins, Roadmap,
Conversemos). Los datos concretos de cada diagnóstico (empresa, puntajes) se
arman aparte en `buildUserMessage()`, en el mismo archivo, y se le envían a
Claude como el mensaje del usuario.

Si el informe no suena como quieren, este es el archivo a editar — no hace
falta tocar nada del frontend. Después de editarlo, hay que volver a
desplegar la función: `supabase functions deploy generate-report`.

## Cómo modificar lo más común, sin ayuda de un desarrollador

| Qué quiero cambiar | Dónde |
|---|---|
| El color de acento (botones, gráfico, badges) | `src/index.css`, las 3 variables al inicio (`--color-accent`, `--color-accent-light`, `--color-accent-dark`) |
| El logo / nombre "Tree Studio" en pantalla | Buscar el texto `Tree Studio` en `src/components/Landing/Landing.tsx` y `src/components/Results/ResultsPage.tsx` |
| Las preguntas del cuestionario | `src/config/questions.ts` — cada pregunta tiene `prompt`, `lowLabel` y `highLabel`. Agregar o quitar preguntas ahí se refleja solo en toda la app |
| Los puntos de corte de cada nivel de madurez (Inicial/En Desarrollo/Consolidado/Líder) | `src/config/scoring.ts`, arreglo `maturityLevels` |
| El peso de cada categoría en el puntaje global | `src/config/scoring.ts`, objeto `categoryWeights` |
| El tono/contenido del informe generado por IA | `supabase/functions/generate-report/systemPrompt.ts` (requiere redesplegar la función) |
| El correo de contacto del botón "Agendar una conversación" | `src/components/Results/ContactCTA.tsx` |

Con eso — cambiar textos en `questions.ts`, la paleta en `index.css` y el
prompt en `systemPrompt.ts` — se puede adaptar casi toda la herramienta sin
tocar un componente de React. Los cambios de texto y color se pueden hacer
directamente en el editor de Lovable (que también permite pedirle en
lenguaje simple "cambia el color de acento a azul", por ejemplo); los
cambios al prompt de la función sí requieren pasar por la CLI de Supabase
como se explica arriba, porque Lovable no edita Edge Functions desde su
editor visual.

## Estructura del proyecto

```
src/
  config/questions.ts     Categorías y preguntas del cuestionario
  config/scoring.ts        Niveles de madurez y ponderación de categorías
  lib/scoringEngine.ts     Cálculo de puntajes (respuestas → 0-100 por categoría y global)
  lib/shareLink.ts         Codificación del estado en la URL para compartir
  lib/supabaseClient.ts    Cliente de Supabase (URL + anon key, ambas públicas)
  lib/api.ts                Invoca la Edge Function para generar el informe
  components/Landing/       Pantalla de bienvenida + formulario de datos de empresa
  components/Questionnaire/ Flujo de preguntas, una categoría a la vez
  components/Results/       Dashboard de resultados: radar, puntajes, informe, compartir
supabase/
  functions/generate-report/index.ts        Edge Function: llama a la API de Claude
  functions/generate-report/systemPrompt.ts  Prompt de sistema + armado del mensaje enviado a Claude
  config.toml                                Config del proyecto Supabase (función pública, sin login)
```

## Criterios de éxito (estado actual)

- Cuestionario completo en menos de 5 minutos: 6 categorías, 21 preguntas, cumple.
- Pantalla de resultados con jerarquía visual clara (score, radar, informe): construida.
- Informe generado por Claude con tono de consultor senior: prompt de sistema definido en `supabase/functions/generate-report/systemPrompt.ts`, pendiente de desplegar en Supabase con una `ANTHROPIC_API_KEY` real para probarlo de punta a punta.
- Cambiar color de acento, textos de preguntas y logo sin ayuda: documentado arriba, son cambios de texto/CSS, editables incluso desde el propio editor de Lovable.
