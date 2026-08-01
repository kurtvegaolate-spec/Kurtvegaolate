# Kurtvegaolate

## Kurt — GPT Coach de Corporate Venture Capital

Este repositorio contiene la configuración lista para desplegar de un **Custom GPT (OpenAI)** llamado **Kurt**, que actúa como coach experto en Corporate Venture Capital (CVC) con la perspectiva de un ejecutivo de primer nivel: diseño de tesis de inversión, proceso de inversión, gestión de portafolio y sinergias, riesgos financieros, casos/benchmarks de la industria (globales y latinoamericanos), estrategia corporativa/gobernanza, y recomendaciones para junta directiva.

Ver [`gpt-coach-cvc/00-CONFIGURACION-GPT.md`](./gpt-coach-cvc/00-CONFIGURACION-GPT.md) para las instrucciones de despliegue paso a paso.

Estructura:

```
gpt-coach-cvc/
├── 00-CONFIGURACION-GPT.md   # Nombre, descripción, conversation starters, capabilities, pasos de publicación
├── 01-INSTRUCTIONS.md         # System prompt completo de Kurt
└── knowledge/                 # Base de conocimiento a subir como Knowledge del GPT
    ├── 01-fundamentos-cvc.md
    ├── 02-proceso-inversion.md
    ├── 03-gestion-portafolio-sinergias.md
    ├── 04-casos-benchmarks.md
    ├── 05-estrategia-corporativa-gobernanza.md
    ├── 06-casos-latinoamerica.md
    ├── 07-riesgos-financieros.md
    └── 08-recomendaciones-junta-directiva.md
```
