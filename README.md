# Kurtvegaolate

## GPT Coach — Corporate Venture Capital

Este repositorio contiene la configuración lista para desplegar de un **Custom GPT (OpenAI)** que actúa como coach experto en Corporate Venture Capital (CVC): diseño de tesis de inversión, proceso de inversión, gestión de portafolio y sinergias, casos/benchmarks de la industria, y estrategia corporativa/gobernanza.

Ver [`gpt-coach-cvc/00-CONFIGURACION-GPT.md`](./gpt-coach-cvc/00-CONFIGURACION-GPT.md) para las instrucciones de despliegue paso a paso.

Estructura:

```
gpt-coach-cvc/
├── 00-CONFIGURACION-GPT.md   # Nombre, descripción, conversation starters, capabilities, pasos de publicación
├── 01-INSTRUCTIONS.md         # System prompt completo del coach
└── knowledge/                 # Base de conocimiento a subir como Knowledge del GPT
    ├── 01-fundamentos-cvc.md
    ├── 02-proceso-inversion.md
    ├── 03-gestion-portafolio-sinergias.md
    ├── 04-casos-benchmarks.md
    └── 05-estrategia-corporativa-gobernanza.md
```
