import type { Category } from "@/types";

/**
 * Fuente única de verdad del cuestionario. Editar textos aquí no requiere
 * tocar ningún componente: la UI se genera automáticamente a partir de esta lista.
 */
export const categories: Category[] = [
  {
    id: "estrategia",
    name: "Estrategia & Liderazgo",
    shortName: "Estrategia",
    description:
      "Qué tan clara y respaldada por el liderazgo está la agenda digital y de IA de la organización.",
    questions: [
      {
        id: "estrategia_1",
        prompt: "¿La organización tiene una estrategia digital y de IA formalizada?",
        lowLabel: "No existe, las iniciativas surgen de forma aislada",
        highLabel: "Existe una estrategia formal con objetivos y métricas claras",
      },
      {
        id: "estrategia_2",
        prompt: "¿Qué tan involucrado está el equipo ejecutivo en decisiones de transformación digital?",
        lowLabel: "TI decide sola, sin patrocinio del directorio",
        highLabel: "El CEO y el directorio revisan avances periódicamente",
      },
      {
        id: "estrategia_3",
        prompt: "¿Existe presupuesto dedicado y protegido para iniciativas digitales y de IA?",
        lowLabel: "Se financia de forma oportunista, proyecto a proyecto",
        highLabel: "Hay presupuesto plurianual asignado y priorizado",
      },
      {
        id: "estrategia_4",
        prompt: "¿Cómo se mide el retorno de las inversiones en transformación digital?",
        lowLabel: "No se mide, o se mide de forma anecdótica",
        highLabel: "Hay KPIs de negocio definidos y se revisan con disciplina",
      },
    ],
  },
  {
    id: "datos",
    name: "Datos & Analítica",
    shortName: "Datos",
    description:
      "La calidad, accesibilidad y uso efectivo de los datos para tomar decisiones.",
    questions: [
      {
        id: "datos_1",
        prompt: "¿Qué tan confiables y centralizados están los datos críticos del negocio?",
        lowLabel: "Viven dispersos en planillas y sistemas que no conversan entre sí",
        highLabel: "Están centralizados en una plataforma de datos gobernada",
      },
      {
        id: "datos_2",
        prompt: "¿Cómo se toman las decisiones operativas y comerciales relevantes?",
        lowLabel: "Principalmente por intuición o experiencia",
        highLabel: "Se apoyan sistemáticamente en dashboards y modelos analíticos",
      },
      {
        id: "datos_3",
        prompt: "¿Existe un equipo o función de datos/analítica con dueños claros?",
        lowLabel: "No hay roles definidos, cada área se arregla por su cuenta",
        highLabel: "Hay un equipo de datos con gobierno y estándares definidos",
      },
      {
        id: "datos_4",
        prompt: "¿Qué tan rápido puede la empresa responder una pregunta de negocio con datos?",
        lowLabel: "Toma semanas y requiere pedir ayuda a TI",
        highLabel: "Se responde en horas mediante self-service analytics",
      },
    ],
  },
  {
    id: "tecnologia",
    name: "Tecnología & Automatización",
    shortName: "Tecnología",
    description:
      "La modernidad de la infraestructura y el nivel de automatización de procesos clave.",
    questions: [
      {
        id: "tecnologia_1",
        prompt: "¿En qué estado se encuentra la infraestructura tecnológica core?",
        lowLabel: "Sistemas legacy, altamente parchados y difíciles de modificar",
        highLabel: "Arquitectura moderna, en la nube y escalable",
      },
      {
        id: "tecnologia_2",
        prompt: "¿Qué porcentaje de los procesos repetitivos está automatizado?",
        lowLabel: "Casi todo se hace manualmente o por correo/planillas",
        highLabel: "La mayoría de los procesos repetitivos están automatizados",
      },
      {
        id: "tecnologia_3",
        prompt: "¿Los distintos sistemas de la empresa están integrados entre sí?",
        lowLabel: "Son islas que requieren trabajo manual para conectarse",
        highLabel: "Están integrados vía APIs con flujo de información fluido",
      },
    ],
  },
  {
    id: "ia",
    name: "Inteligencia Artificial",
    shortName: "IA",
    description:
      "La madurez real de adopción de IA generativa y predictiva más allá del discurso.",
    questions: [
      {
        id: "ia_1",
        prompt: "¿Qué uso le da hoy la organización a la inteligencia artificial?",
        lowLabel: "Ninguno formal, algunos usan ChatGPT por su cuenta",
        highLabel: "Hay casos de uso productivos con impacto medible",
      },
      {
        id: "ia_2",
        prompt: "¿Existen políticas o lineamientos claros para el uso responsable de IA?",
        lowLabel: "No existen, cada persona decide qué y cómo usar",
        highLabel: "Hay lineamientos claros de uso, riesgo y datos sensibles",
      },
      {
        id: "ia_3",
        prompt: "¿Qué tan preparados están los equipos para trabajar con herramientas de IA?",
        lowLabel: "Hay desconocimiento y resistencia generalizada",
        highLabel: "Los equipos usan IA de forma cotidiana en su trabajo",
      },
      {
        id: "ia_4",
        prompt: "¿La empresa ha explorado o implementado IA generativa en procesos propios?",
        lowLabel: "No se ha explorado más allá de la curiosidad individual",
        highLabel: "Hay pilotos o soluciones en producción con resultados",
      },
    ],
  },
  {
    id: "procesos",
    name: "Procesos & Operaciones",
    shortName: "Procesos",
    description:
      "El nivel de estandarización, documentación y mejora continua de los procesos operativos.",
    questions: [
      {
        id: "procesos_1",
        prompt: "¿Qué tan documentados y estandarizados están los procesos clave?",
        lowLabel: "Dependen del conocimiento tácito de personas específicas",
        highLabel: "Están documentados, estandarizados y se auditan",
      },
      {
        id: "procesos_2",
        prompt: "¿Existe una práctica activa de mejora continua de procesos?",
        lowLabel: "Los procesos casi no cambian salvo por crisis",
        highLabel: "Hay revisión y optimización periódica basada en datos",
      },
      {
        id: "procesos_3",
        prompt: "¿Qué tan visible es el desempeño operativo en tiempo real?",
        lowLabel: "Se conoce el desempeño semanas después, si es que se conoce",
        highLabel: "Hay visibilidad en tiempo real con alertas tempranas",
      },
    ],
  },
  {
    id: "cultura",
    name: "Cultura & Talento",
    shortName: "Cultura",
    description:
      "La disposición de las personas y la organización para adoptar nuevas formas de trabajar.",
    questions: [
      {
        id: "cultura_1",
        prompt: "¿Cómo reacciona la organización frente a nuevas herramientas digitales?",
        lowLabel: "Con resistencia y baja adopción real",
        highLabel: "Con curiosidad y adopción activa desde los equipos",
      },
      {
        id: "cultura_2",
        prompt: "¿Existen instancias de capacitación en habilidades digitales y de IA?",
        lowLabel: "No hay programas formales de capacitación",
        highLabel: "Hay programas activos y presupuesto para formación continua",
      },
      {
        id: "cultura_3",
        prompt: "¿Qué tan fácil es para un equipo probar una idea digital nueva?",
        lowLabel: "Requiere múltiples aprobaciones y meses de espera",
        highLabel: "Los equipos pueden experimentar con autonomía y rapidez",
      },
    ],
  },
];

export const industryLabels: Record<string, string> = {
  retail: "Retail",
  consumo_masivo: "Consumo masivo",
  logistica: "Logística",
  educacion_superior: "Educación superior",
  servicios_financieros: "Servicios financieros",
  manufactura: "Manufactura / Industria",
  otra: "Otra industria",
};

export const companySizeLabels: Record<string, string> = {
  "50_200": "50 - 200 colaboradores",
  "200_1000": "200 - 1.000 colaboradores",
  "1000_5000": "1.000 - 5.000 colaboradores",
  "5000_mas": "Más de 5.000 colaboradores",
};
