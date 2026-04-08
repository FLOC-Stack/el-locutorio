"use client";

import { useEffect, useState } from "react";

type SiteNavProps = {
  aboutId: string;
  communityId: string;
  showsId: string;
  episodesId: string;
};

export function SiteNav({
  aboutId,
  communityId,
  showsId,
  episodesId,
}: SiteNavProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    let frame = 0;
    let delayedUpdate = 0;
    let lastScrollY = window.scrollY;

    const updateState = () => {
      frame = 0;
      const heroBounds = hero.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const scrolledPastHeroLead =
        currentScrollY > Math.max(56, window.innerHeight * 0.08);
      const shouldCompact =
        scrolledPastHeroLead || heroBounds.bottom <= window.innerHeight * 0.68;
      const scrollingUp = currentScrollY <= lastScrollY;
      const shouldShow = !shouldCompact || scrollingUp || currentScrollY < 24;

      setIsCompact((current) =>
        current === shouldCompact ? current : shouldCompact,
      );
      setIsVisible((current) => (current === shouldShow ? current : shouldShow));
      lastScrollY = currentScrollY;
    };

    const scheduleUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateState);
    };

    updateState();
    delayedUpdate = window.setTimeout(updateState, 120);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(delayedUpdate);

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return (
    <nav
      className={`nav${isCompact ? " nav--compact" : ""}${isVisible ? "" : " nav--hidden"}`}
      aria-label="Navegacion principal"
    >
      <div className="nav__side nav__side--left">
        <ul className="nav__links nav__links--left">
          <li>
            <a href={`#${aboutId}`} className="nav__link">
              Qué es
            </a>
          </li>
          <li>
            <a href={`#${communityId}`} className="nav__link">
              Comunidad
            </a>
          </li>
        </ul>
      </div>

      <a href="/" className="nav__logo-link" aria-label="Inicio">
        <img
          className="nav__logo"
          src="/assets/Logo_El_Locutorio.svg"
          alt="El Locutorio"
          width={1131}
          height={440}
        />
      </a>

      <div className="nav__side nav__side--right">
        <ul className="nav__links nav__links--right">
          <li>
            <a href={`#${showsId}`} className="nav__link">
              Shows en vivo
            </a>
          </li>
          <li>
            <a href={`#${episodesId}`} className="nav__link">
              Episodios
            </a>
          </li>
        </ul>

        <span className="nav__cta nav__cta--disabled" aria-disabled="true">
          Unete
        </span>
      </div>
    </nav>
  );
}
