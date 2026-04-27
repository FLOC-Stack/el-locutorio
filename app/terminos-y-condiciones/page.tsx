const termsSections = [
  {
    title: "Uso del sitio",
    body: "Este texto es un placeholder. Aquí se describirán las condiciones de acceso, navegación y uso del sitio web de El Locutorio.",
  },
  {
    title: "Contenido",
    body: "Este texto es un placeholder. La versión final deberá aclarar la titularidad de textos, imágenes, marca, piezas audiovisuales y materiales editoriales.",
  },
  {
    title: "Eventos y reservas",
    body: "Este texto es un placeholder. Si el sitio permite reservas o inscripciones, aquí se detallarán condiciones, disponibilidad, cambios y cancelaciones.",
  },
  {
    title: "Limitación de responsabilidad",
    body: "Este texto es un placeholder. Las condiciones definitivas deberán explicar el alcance de responsabilidad del proyecto y los enlaces o servicios externos.",
  },
];

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__inner shell-wide">
        <a className="legal-page__back" href="/">
          Volver al inicio
        </a>

        <header className="legal-page__header">
          <p className="legal-page__eyebrow">Legal</p>
          <h1 className="legal-page__title">Términos y condiciones</h1>
          <p className="legal-page__intro">
            Página placeholder mobile-first para definir las reglas básicas de uso de El Locutorio.
            El contenido definitivo debe revisarse con asesoría legal antes de publicar.
          </p>
        </header>

        <div className="legal-page__sections">
          {termsSections.map((section) => (
            <section className="legal-page__section" key={section.title}>
              <h2 className="legal-page__section-title">{section.title}</h2>
              <p className="legal-page__paragraph">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
