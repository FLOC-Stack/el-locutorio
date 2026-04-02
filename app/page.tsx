export default function HomePage() {
  return (
    <>
      {/* === NAV === */}
      <nav className="nav" aria-label="Navegacion principal">
        <ul className="nav__links nav__links--left">
          <li>
            <span className="nav__link nav__link--disabled" aria-disabled="true">
              Que es
            </span>
          </li>
          <li>
            <span className="nav__link nav__link--disabled" aria-disabled="true">
              Comunidad
            </span>
          </li>
        </ul>
        <a href="/" className="nav__logo-link">
          <img
            className="nav__logo"
            src="/assets/Logo_El_Locutorio.svg"
            alt="El Locutorio"
            width={1131}
            height={440}
          />
        </a>
        <ul className="nav__links nav__links--right">
          <li>
            <span className="nav__link nav__link--disabled" aria-disabled="true">
              Shows en vivo
            </span>
          </li>
          <li>
            <span className="nav__link nav__link--disabled" aria-disabled="true">
              Episodios
            </span>
          </li>
        </ul>
        <span className="nav__cta nav__cta--disabled" aria-disabled="true">
          Unete
        </span>
      </nav>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero__shape-blue" />
        <div className="hero__shape-red" />

        <figure className="hero__portrait">
          <img
            src="/assets/harold.png"
            alt="Harold Correa, presentador de El Locutorio"
            width={620}
            height={780}
          />
        </figure>

        <div className="hero__content">
          <h1 className="hero__title">Con<br />Harold<br />Correa</h1>
          <p className="hero__tagline">
            Humor inteligente<br />&middot; Conversaci&oacute;n inc&oacute;moda<br />&middot; Comunidad real
          </p>
        </div>

        <div className="hero__card">
          <figure className="hero__guest">
            <img
              src="/assets/guest-badge.png"
              alt="Invitado destacado"
              width={160}
              height={160}
            />
          </figure>
          <div className="hero__guest-info">
            <span className="hero__guest-label">Entrevistamos a</span>
            <strong className="hero__guest-name">Luiza Bacceli</strong>
            <span
              className="hero__guest-cta hero__guest-cta--disabled"
              aria-disabled="true"
            >
              <img
                src="/assets/YouTube_Button.svg"
                alt=""
                width={54}
                height={38}
                aria-hidden="true"
              />
              <span>
                Play para ver el
                <br />
                shows en vivo
              </span>
            </span>
          </div>
        </div>

        <div className="hero__phone" aria-hidden="true">
          <img src="/assets/telefono.png" alt="" width={180} height={400} />
        </div>

        <a href="#" className="hero__cta-bottom">Únete</a>
      </section>
    </>
  );
}
