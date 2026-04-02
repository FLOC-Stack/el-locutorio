import { Fragment } from "react";
import { homePageContent } from "./homepage-content";

function renderMultilineText(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export default function HomePage() {
  const { hero, about } = homePageContent;

  return (
    <>
      {/* === NAV === */}
      <nav className="nav" aria-label="Navegacion principal">
        <ul className="nav__links nav__links--left">
          <li>
            <a href={`#${about.id}`} className="nav__link">
              Qué es
            </a>
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
          <h1 className="hero__title">{renderMultilineText(hero.title)}</h1>
          <p className="hero__tagline">{renderMultilineText(hero.tagline)}</p>
        </div>

        <div className="hero__card">
          <figure className="hero__guest">
            <img
              src={hero.featuredGuest.image.src}
              alt={hero.featuredGuest.image.alt}
              width={hero.featuredGuest.image.width}
              height={hero.featuredGuest.image.height}
            />
          </figure>
          <div className="hero__guest-info">
            <span className="hero__guest-label">{hero.featuredGuest.label}</span>
            <strong className="hero__guest-name">{hero.featuredGuest.name}</strong>
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
                {hero.featuredGuest.cta}
                <br />
                {hero.featuredGuest.ctaNote}
              </span>
            </span>
          </div>
        </div>

        <div className="hero__phone" aria-hidden="true">
          <img src="/assets/telefono.png" alt="" width={180} height={400} />
        </div>

        <a href="#" className="hero__cta-bottom">Únete</a>
      </section>

      {/* === ABOUT / QUE ES === */}
      <section className="about" id={about.id} aria-labelledby="about-title">
        <div className="about__intro">
          <p className="about__eyebrow">{about.eyebrow}</p>
          <h2 className="about__title" id="about-title">
            {renderMultilineText(about.title)}
          </h2>
          <p className="about__description">{about.description}</p>
        </div>

        <div className="about__cards">
          {about.cards.map((card) => (
            <article
              key={card.id}
              className={`about__card about__card--${card.theme}`}
              aria-labelledby={`about-card-title-${card.id}`}
            >
              <div className="about__card-media">
                <img
                  className="about__card-shape"
                  src={card.shape.src}
                  alt={card.shape.alt}
                  width={card.shape.width}
                  height={card.shape.height}
                  aria-hidden="true"
                />
                <img
                  className="about__card-graphic"
                  src={card.graphic.src}
                  alt={card.graphic.alt}
                  width={card.graphic.width}
                  height={card.graphic.height}
                />
                <div className="about__card-copy">
                  <h3 className="about__card-title" id={`about-card-title-${card.id}`}>
                    {card.title}
                  </h3>
                  <p className="about__card-description">{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
