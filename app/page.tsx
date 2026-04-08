import { Fragment } from "react";
import { homePageContent } from "./homepage-content";
import type { HomePageContent, ShowCard } from "./homepage-content";
import { getYouTubeEpisodes } from "../lib/youtube";
import type { YouTubeEpisode } from "../lib/youtube";
import { SiteNav } from "./site-nav";

type PosterStep = HomePageContent["community"]["steps"][number];

const showShapeByTheme: Record<ShowCard["theme"], string> = {
  blue: "/assets/show-live-card-shape-blue.svg",
  yellow: "/assets/show-live-card-shape-yellow.svg",
};

function ShowCardComponent({ card }: { card: ShowCard }) {
  const isAvailable = card.cta.href !== null;

  return (
    <div className={`shows__card-wrap shows__card-wrap--${card.theme}`}>
      <div className="shows__card-stage">
        <article className={`shows__card shows__card--${card.theme}`} aria-labelledby={`shows-card-title-${card.id}`}>
          {card.photo ? (
            <div className="shows__card-photo">
              <img
                src={card.photo.src}
                alt={card.photo.alt}
                width={card.photo.width}
                height={card.photo.height}
              />
            </div>
          ) : null}

          <img
            className="shows__card-shape"
            src={showShapeByTheme[card.theme]}
            alt=""
            width={490}
            height={518}
            aria-hidden="true"
          />

          <div className="shows__card-info">
            <h3 className="shows__card-city" id={`shows-card-title-${card.id}`}>
              {card.city}
            </h3>
            <p className="shows__card-meta">
              <span className="shows__card-date">{card.date}</span>
              <span className="shows__card-time">{card.time}</span>
            </p>
            <p className="shows__card-capacity">{card.capacity}</p>
          </div>
        </article>

        {isAvailable ? (
          <a
            href={card.cta.href!}
            className={`shows__card-cta shows__card-cta--${card.cta.style}`}
          >
            {card.cta.label}
          </a>
        ) : (
          <span
            className={`shows__card-cta shows__card-cta--${card.cta.style}`}
            aria-disabled="true"
          >
            {card.cta.label}
          </span>
        )}
      </div>
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

function EpisodeFeature({
  episode,
  fallback,
}: {
  episode: YouTubeEpisode | null;
  fallback: HomePageContent["episodes"];
}) {
  if (!episode) {
    return (
      <article className="episodes__feature episodes__feature--empty">
        <div className="episodes__feature-media" aria-hidden="true" />
        <div className="episodes__feature-overlay">
          <p className="episodes__feature-label">{fallback.emptyLabel}</p>
          <h3 className="episodes__feature-title">{fallback.emptyTitle}</h3>
          <p className="episodes__feature-description">{fallback.emptyDescription}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="episodes__feature">
      {episode.thumbnailUrl ? (
        <img
          className="episodes__feature-media"
          src={episode.thumbnailUrl}
          alt={episode.title}
          width={1280}
          height={720}
        />
      ) : (
        <div className="episodes__feature-media" aria-hidden="true" />
      )}

      <div className="episodes__feature-overlay">
        <p className="episodes__feature-kicker">EPISODIO #1</p>
        <h3 className="episodes__feature-title">{episode.title}</h3>
        <p className="episodes__feature-host">CON HAROLD CORREA</p>
        <span className="episodes__duration">
          {episode.durationText ?? "--:--"}
        </span>
      </div>
    </article>
  );
}

function EpisodeCard({
  episode,
  index,
}: {
  episode: YouTubeEpisode | null;
  index: number;
}) {
  const number = index + 2;

  return (
    <article className={`episodes__card${episode ? "" : " episodes__card--empty"}`}>
      {episode?.thumbnailUrl ? (
        <img
          className="episodes__card-media"
          src={episode.thumbnailUrl}
          alt={episode.title}
          width={299}
          height={184}
        />
      ) : (
        <div className="episodes__card-media" aria-hidden="true" />
      )}

      <div className="episodes__card-overlay">
        <p className="episodes__card-kicker">{`EPISODIO #${number}`}</p>
        <h3 className="episodes__card-title">
          {episode?.title ?? "Próximamente"}
        </h3>
        <p className="episodes__card-host">CON HAROLD CORREA</p>
        <span className="episodes__duration episodes__duration--small">
          {episode?.durationText ?? "--:--"}
        </span>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const { hero, about, community, shows, episodes, whyExists, footer } = homePageContent;
  const youtubeEpisodes = await getYouTubeEpisodes(4);
  const featuredEpisode = youtubeEpisodes.episodes[0] ?? null;
  const restEpisodes = Array.from({ length: 3 }, (_, index) => youtubeEpisodes.episodes[index + 1] ?? null);

  return (
    <div className="page-shell">
      <SiteNav
        aboutId={about.id}
        communityId={community.id}
        showsId={shows.id}
        episodesId={episodes.id}
      />

      {/* === HERO === */}
      <section className="hero" id="hero">
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

      {/* === EPISODIOS === */}
      <section className="episodes" id={episodes.id} aria-labelledby="episodes-title">
        <div className="episodes__texture" aria-hidden="true" />

        <header className="episodes__header">
          <p className="episodes__eyebrow" id="episodes-title">{episodes.eyebrow}</p>
          <p className="episodes__hashtags">{episodes.hashtags}</p>
        </header>

        <div className="episodes__body">
          <div className="episodes__feature-wrap">
            <EpisodeFeature episode={featuredEpisode} fallback={episodes} />
          </div>

          <aside className="episodes__sidebar" aria-labelledby="episodes-title">
            <div className="episodes__grid">
              {restEpisodes.map((episode, index) => (
                <EpisodeCard key={episode?.id ?? `placeholder-${index}`} episode={episode} index={index} />
              ))}
            </div>

            {youtubeEpisodes.channelUrl ? (
              <a
                href={youtubeEpisodes.channelUrl}
                className="episodes__cta"
                target="_blank"
                rel="noreferrer"
              >
                {episodes.ctaLabel}
              </a>
            ) : (
              <span className="episodes__cta episodes__cta--disabled" aria-disabled="true">
                {episodes.ctaLabel}
              </span>
            )}
          </aside>
        </div>
      </section>

      {/* === POR QUÉ EXISTIMOS === */}
      <section className="why" id={whyExists.id} aria-labelledby="why-title">
        <header className="why__header">
          <p className="why__eyebrow">{whyExists.eyebrow}</p>
          <h2 className="why__title" id="why-title">
            {renderMultilineText(whyExists.title)}
          </h2>
          <p className="why__description">{whyExists.description}</p>
        </header>

        <div className="why__body">
          <div className="why__claims" aria-label="Manifiesto">
            {whyExists.claims.map((claim) => (
              <p key={claim} className="why__claim">
                {renderMultilineText(claim)}
              </p>
            ))}
          </div>

          <figure className="why__image">
            <img
              src={whyExists.image.src}
              alt={whyExists.image.alt}
              width={whyExists.image.width}
              height={whyExists.image.height}
            />
          </figure>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="site-footer" aria-labelledby="site-footer-title">
        <div className="site-footer__inner">
          <img
            className="site-footer__logo"
            src="/assets/logo_verde.svg"
            alt="El Locutorio"
            width={1131}
            height={440}
          />

          <p className="site-footer__tagline" id="site-footer-title">
            {footer.tagline}
          </p>

          <div className="site-footer__socials" aria-label="Redes sociales">
            {footer.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className={`site-footer__social site-footer__social--${social.id}`}
                aria-label={social.label}
              >
                <img
                  src={social.icon.src}
                  alt={social.icon.alt}
                  width={social.icon.width}
                  height={social.icon.height}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <div className="site-footer__meta">
            <div className="site-footer__line" aria-hidden="true" />
            <div className="site-footer__bottom">
              <p className="site-footer__notice">
                <span aria-hidden="true">©</span>
                <span>{footer.legalNotice}</span>
              </p>

              <p className="site-footer__legal">
                <a href="#">{footer.privacyLabel}</a>
                <span aria-hidden="true">-</span>
                <a href="#">{footer.termsLabel}</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
