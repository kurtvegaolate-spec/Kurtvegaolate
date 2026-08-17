export function ContactCTA() {
  return (
    <div className="no-print rounded-2xl bg-ink px-8 py-10 md:px-10 md:py-12 text-center">
      <h3 className="text-xl md:text-2xl font-serif text-white">
        ¿Conversamos sobre estos resultados?
      </h3>
      <p className="mt-3 text-sm md:text-[15px] text-white/70 max-w-md mx-auto leading-relaxed">
        Un Director de Tree Studio puede revisar este diagnóstico con usted y
        precisar un plan de acción concreto para su organización.
      </p>
      <a
        href="mailto:contacto@treestudio.cl?subject=Conversemos%20sobre%20mi%20diagn%C3%B3stico%20de%20madurez%20digital"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-sm font-medium text-ink hover:bg-white/90 transition-colors"
      >
        Agendar una conversación
      </a>
    </div>
  );
}
