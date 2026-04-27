const privacySections = [
  {
    title: "Responsable",
    body: "Este texto es un placeholder. Aquí se indicará quién gestiona El Locutorio, cómo contactar y qué entidad será responsable del tratamiento de los datos.",
  },
  {
    title: "Datos que podemos recoger",
    body: "Este texto es un placeholder. La política final deberá explicar qué datos se recopilan mediante formularios, reservas, newsletters, analítica o comunicaciones directas.",
  },
  {
    title: "Finalidad",
    body: "Este texto es un placeholder. Los datos se usarán para gestionar solicitudes, comunicar novedades del proyecto, organizar eventos y mejorar la experiencia digital.",
  },
  {
    title: "Derechos",
    body: "Este texto es un placeholder. La versión legal definitiva deberá explicar cómo ejercer derechos de acceso, rectificación, supresión, oposición y otros derechos aplicables.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__inner shell-wide">
        <a className="legal-page__back" href="/">
          Volver al inicio
        </a>

        <header className="legal-page__header">
          <p className="legal-page__eyebrow">Legal</p>
          <h1 className="legal-page__title">Política de privacidad</h1>
          <p className="legal-page__intro">
            Página placeholder mobile-first para preparar la estructura legal de El Locutorio.
            El contenido definitivo debe revisarse con asesoría legal antes de publicar.
          </p>
        </header>

        <div className="legal-page__sections">
          {privacySections.map((section) => (
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
