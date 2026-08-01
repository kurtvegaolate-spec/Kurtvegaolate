# Configuración del Custom GPT — Coach de Corporate Venture Capital

Este documento contiene todo lo necesario para crear el GPT en el **GPT Builder de OpenAI** (chatgpt.com/gpts/editor). Copia cada sección en el campo correspondiente.

---

## 1. Nombre

```
CVC Coach — Corporate Venture Capital Expert
```

## 2. Descripción (campo "Description")

```
Coach experto en Corporate Venture Capital. Te ayuda a diseñar, lanzar, operar y escalar un programa de CVC: tesis de inversión, sourcing, due diligence, term sheets, gobernanza, integración estratégica con el negocio y medición de impacto. Basado en frameworks probados y benchmarks de la industria (Google Ventures, Intel Capital, Salesforce Ventures, M12, entre otros).
```

## 3. Instrucciones (campo "Instructions")

Copiar el contenido completo de [`01-INSTRUCTIONS.md`](./01-INSTRUCTIONS.md) en el campo "Instructions" del builder.

## 4. Conversation starters

```
¿Cómo diseño la tesis de inversión de mi fondo de CVC?
Ayúdame a estructurar el proceso de due diligence para una startup
¿Cómo mido el éxito estratégico vs. financiero de mi portafolio?
¿Qué modelo de gobernanza le conviene a mi programa de CVC?
```

## 5. Capabilities recomendadas

| Capability | Estado | Razón |
|---|---|---|
| Web Browsing | ✅ Activado | Para benchmarks actualizados, noticias de deals, multiples de mercado |
| Code Interpreter / Data Analysis | ✅ Activado | Para cálculos de cap table, dilución, ROI, IRR, modelos de portafolio |
| DALL·E Image Generation | ⚪ Opcional | Útil para diagramas de gobernanza o frameworks visuales |
| Actions | ⚪ Ninguna por defecto | No se requieren APIs externas para el rol de coach |

## 6. Knowledge (archivos a subir)

Sube todos los archivos de la carpeta [`knowledge/`](./knowledge/) como Knowledge del GPT:

- `01-fundamentos-cvc.md`
- `02-proceso-inversion.md`
- `03-gestion-portafolio-sinergias.md`
- `04-casos-benchmarks.md`
- `05-estrategia-corporativa-gobernanza.md`

## 7. Pasos para publicar

1. Ir a chatgpt.com → **Explore GPTs** → **Create**.
2. En la pestaña **Configure**: pegar Nombre, Descripción e Instructions.
3. Subir los 5 archivos de `knowledge/` en la sección **Knowledge**.
4. Activar Web Browsing y Code Interpreter en **Capabilities**.
5. Añadir los conversation starters.
6. (Opcional) Generar un ícono con DALL·E describiendo: "ícono minimalista de un coach/mentor con un gráfico de inversión ascendente, estilo flat, colores azul corporativo y verde".
7. Guardar como privado, solo por link, o público según necesidad.
