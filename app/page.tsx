import { Fragment } from "react";
import { homePageContent } from "./homepage-content";
import type { HomePageContent, ShowCard } from "./homepage-content";

type PosterStep = HomePageContent["community"]["steps"][number];

function ShowCardComponent({ card }: { card: ShowCard }) {
  const isAvailable = card.cta.href !== null;
  return (
    <div className="shows__card-wrap">
      <article className={`shows__card shows__card--${card.theme}${card.photo ? "" : " shows__card--no-photo"}`}>
        {card.photo && (
          <div className="shows__card-photo">
            <img
              src={card.photo.src}
              alt={card.photo.alt}
              width={card.photo.width}
              height={card.photo.height}
            />
          </div>
        )}
        <div className="shows__card-info">
          <h3 className="shows__card-city">{card.city}</h3>
          <p className="shows__card-meta">
            <span className="shows__card-date">{card.date}</span>
            <span className="shows__card-time">{card.time}</span>
          </p>
          <p className="shows__card-capacity">{card.capacity}</p>
        </div>
      </article>
      {isAvailable ? (
        <a href={card.cta.href!} className="shows__card-cta">
          {card.cta.label}
        </a>
      ) : (
        <span className="shows__card-cta shows__card-cta--soon" aria-disabled="true">
          {card.cta.label}
        </span>
      )}
    </div>
  );
}

const frameByTheme: Record<string, string> = {
  yellow: "/assets/frame_vector_amarillo.svg",
  green:  "/assets/frame_vector_verde.svg",
  blue:   "/assets/frame_vector_azul.svg",
  dark:   "/assets/frame_vector.svg",
};

function PosterCard({ step }: { step: PosterStep }) {
  return (
    <article className={`community__poster community__poster--${step.theme}`}>
      <div className="community__poster-bg" aria-hidden="true" />
      <img
        className="community__poster-frame"
        src={frameByTheme[step.theme] ?? "/assets/frame_vector.svg"}
        alt=""
        width={468}
        height={567}
        aria-hidden="true"
      />
      <span className="community__poster-number">{step.number}</span>
      <h3 className="community__poster-title">
        {renderMultilineText(step.title)}
      </h3>
      <p className="community__poster-desc">{step.description}</p>
      <img
        className="community__poster-sticker"
        src={step.sticker.src}
        alt={step.sticker.alt}
        width={step.sticker.width}
        height={step.sticker.height}
        aria-hidden="true"
      />
    </article>
  );
}

function renderMultilineText(value: string) {
  return value.split("\n").map((line, index, lines) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export default function HomePage() {
  const { hero, about, community, shows } = homePageContent;

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
            <a href={`#${community.id}`} className="nav__link">
              Comunidad
            </a>
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
            <a href={`#${shows.id}`} className="nav__link">
              Shows en vivo
            </a>
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
          <h1 className="hero__title">
            Con<br className="hero__title-break--mobile" /> Harold<br /> Correa
          </h1>
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

      {/* === COMMUNITY / LA COMUNIDAD === */}
      <section className="community" id={community.id} aria-labelledby="community-title">
        <div className="community__bg" aria-hidden="true" />

        <div className="community__header">
          <div className="community__banner" aria-hidden="true">
            <img
              src="/assets/community-banner-shape.svg"
              alt=""
              width={532}
              height={264}
            />
          </div>
          <p className="community__eyebrow">{community.eyebrow}</p>
        </div>

        <div className="community__intro">
          <div className="community__text">
            <h2 className="community__title" id="community-title">
              {renderMultilineText(community.title)}
            </h2>
            <p className="community__subtitle">{community.subtitle}</p>
          </div>
          <img
            className="community__mic"
            src="/assets/microphone.png"
            alt="Micrófono dorado"
            width={360}
            height={523}
          />
        </div>

        <div className="community__steps">
          {community.steps.map((step) => (
            <PosterCard key={step.id} step={step} />
          ))}
        </div>
      </section>

      {/* === SHOWS EN VIVO === */}
      <section className="shows" id={shows.id} aria-labelledby="shows-title">
        <header className="shows__header">
          <p className="shows__eyebrow">{shows.eyebrow}</p>
          <h2 className="shows__title" id="shows-title">{shows.title}</h2>
        </header>

        <div className="shows__body">
          <div className="shows__cards">
            {shows.cards.map((card) => (
              <ShowCardComponent key={card.id} card={card} />
            ))}
          </div>

          <div className="shows__upcoming">
            <p className="shows__upcoming-label">{shows.upcoming.label}</p>
            <ul className="shows__upcoming-cities">
              {shows.upcoming.cities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
