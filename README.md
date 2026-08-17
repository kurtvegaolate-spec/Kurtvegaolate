# Diagnóstico de Madurez Digital & IA — Tree Studio

Herramienta interactiva de diagnóstico: un ejecutivo responde un cuestionario breve
y recibe al instante un informe personalizado generado por IA, con su nivel de
madurez digital, brechas por dimensión y una invitación a conversar con Tree Studio.

## Cómo correrlo localmente

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env
# Editar .env y pegar su ANTHROPIC_API_KEY
npm run dev
```

Esto levanta dos procesos en paralelo:
- El sitio (Vite) en `http://localhost:5173`
- El servidor de la API (Express) en `http://localhost:3001`

Abrir `http://localhost:5173` en el navegador. En desarrollo, Vite reenvía
automáticamente las llamadas a `/api/*` hacia el servidor Express.

### Para producción (un solo proceso)

```bash
npm run build
npm start
```

`npm start` sirve tanto el sitio ya compilado como la API desde el mismo
proceso Express, en el puerto definido por `PORT` (3001 por defecto).

## Qué se construyó y por qué (resumen de decisiones)

**Stack:** React + TypeScript + Vite para el frontend, Tailwind para estilos,
Recharts para el gráfico radar, y un servidor Express chico que hace de
intermediario hacia la API de Claude. No hay base de datos: no la necesita un
MVP de una sola sesión, y así se evita toda la complejidad de configurar y
mantener una.

**¿Por qué un servidor Express y no llamar a Claude directo desde el navegador?**
La llave de la API (`ANTHROPIC_API_KEY`) nunca debe quedar visible en el
código que corre en el navegador del prospecto — cualquiera podría verla e
inspeccionar el código y usarla para gastar el saldo de la cuenta. El
servidor la guarda como variable de entorno y es el único que habla con
Anthropic; el navegador solo le pide a este servidor "generame el informe".

**Sin base de datos, con "link compartible":** las respuestas y los datos de
la empresa se codifican directamente en la URL (en `src/lib/shareLink.ts`).
Quien abre el link recalcula el puntaje al instante y se vuelve a generar el
informe. Es una limitación consciente del MVP: si más adelante quieren
guardar un historial de diagnósticos completados, ahí sí conviene sumar una
base de datos real.

**Exportar / imprimir:** se usa el diálogo de impresión nativo del navegador
(`window.print()`) con estilos que ocultan los botones y navegación
(`.no-print` en `src/index.css`). El usuario elige "Guardar como PDF" en ese
diálogo. Evita agregar una librería de generación de PDF solo para el MVP.

**Modelo de Claude usado:** el prompt original mencionaba `claude-sonnet-4-6`;
ese identificador no existe como modelo de la API. Se configuró
`claude-sonnet-5` (el modelo Sonnet vigente en este entorno) como valor por
defecto, ajustable sin tocar código vía la variable de entorno
`ANTHROPIC_MODEL` en `.env`.

## El prompt de sistema del informe

Vive en `server/systemPrompt.ts`, en la constante `SYSTEM_PROMPT`. Es lo que
más vale la pena iterar a mano: define el rol (Director de Tree Studio), el
tono (español de Chile, formal, sin frases genéricas de IA), y el formato
exacto de salida (los 5 encabezados: Resumen Ejecutivo, Diagnóstico por
Dimensión, Quick Wins, Roadmap, Conversemos). Los datos concretos de cada
diagnóstico (empresa, puntajes) se arman aparte en `buildUserMessage()`, en
el mismo archivo, y se le envían a Claude como el mensaje del usuario.

Si el informe no suena como quieren, este es el archivo a editar — no hace
falta tocar nada del frontend.

## Cómo modificar lo más común, sin ayuda de un desarrollador

| Qué quiero cambiar | Dónde |
|---|---|
| El color de acento (botones, gráfico, badges) | `src/index.css`, las 3 variables al inicio (`--color-accent`, `--color-accent-light`, `--color-accent-dark`) |
| El logo / nombre "Tree Studio" en pantalla | Buscar el texto `Tree Studio` en `src/components/Landing/Landing.tsx` y `src/components/Results/ResultsPage.tsx` |
| Las preguntas del cuestionario | `src/config/questions.ts` — cada pregunta tiene `prompt`, `lowLabel` y `highLabel`. Agregar o quitar preguntas ahí se refleja solo en toda la app |
| Los puntos de corte de cada nivel de madurez (Inicial/En Desarrollo/Consolidado/Líder) | `src/config/scoring.ts`, arreglo `maturityLevels` |
| El peso de cada categoría en el puntaje global | `src/config/scoring.ts`, objeto `categoryWeights` |
| El tono/contenido del informe generado por IA | `server/systemPrompt.ts` |
| El correo de contacto del botón "Agendar una conversación" | `src/components/Results/ContactCTA.tsx` |

Con eso — cambiar textos en `questions.ts`, la paleta en `index.css` y el
prompt en `systemPrompt.ts` — se puede adaptar casi toda la herramienta sin
tocar un componente de React.

## Estructura del proyecto

```
src/
  config/questions.ts     Categorías y preguntas del cuestionario
  config/scoring.ts        Niveles de madurez y ponderación de categorías
  lib/scoringEngine.ts     Cálculo de puntajes (respuestas → 0-100 por categoría y global)
  lib/shareLink.ts         Codificación del estado en la URL para compartir
  lib/api.ts                Llamada al backend para generar el informe
  components/Landing/       Pantalla de bienvenida + formulario de datos de empresa
  components/Questionnaire/ Flujo de preguntas, una categoría a la vez
  components/Results/       Dashboard de resultados: radar, puntajes, informe, compartir
server/
  index.ts                 Servidor Express: expone /api/generate-report y sirve el build en producción
  systemPrompt.ts           Prompt de sistema + armado del mensaje enviado a Claude
```

## Criterios de éxito (estado actual)

- Cuestionario completo en menos de 5 minutos: 6 categorías, 21 preguntas, cumple.
- Pantalla de resultados con jerarquía visual clara (score, radar, informe): construida.
- Informe generado por Claude con tono de consultor senior: prompt de sistema definido en `server/systemPrompt.ts`, pendiente de una `ANTHROPIC_API_KEY` real para probarlo de punta a punta.
- Cambiar color de acento, textos de preguntas y logo sin ayuda: documentado arriba, son cambios de texto/CSS, no de lógica.
