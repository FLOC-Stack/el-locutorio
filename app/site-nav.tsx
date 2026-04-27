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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: `#${aboutId}`, label: "Qué es" },
    { href: `#${communityId}`, label: "Comunidad" },
    { href: `#${showsId}`, label: "Shows en vivo" },
    { href: `#${episodesId}`, label: "Episodios" },
  ];

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

    const handleHashChange = () => {
      scheduleUpdate();
      setIsMenuOpen(false);
    };

    updateState();
    delayedUpdate = window.setTimeout(updateState, 120);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(delayedUpdate);

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`nav${isCompact ? " nav--compact" : ""}${isVisible || isMenuOpen ? "" : " nav--hidden"}${isMenuOpen ? " nav--open" : ""}`}
      aria-label="Navegacion principal"
    >
      <div className="nav__side nav__side--left">
        <ul className="nav__links nav__links--left">
          {navItems.slice(0, 2).map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav__link">
                {item.label}
              </a>
            </li>
          ))}
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
          {navItems.slice(2).map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="nav__cta nav__cta--disabled" aria-disabled="true">
          Unete
        </span>
      </div>

      <button
        className="nav__toggle"
        type="button"
        aria-controls="mobile-nav-panel"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span className="nav__toggle-line" />
        <span className="nav__toggle-line" />
        <span className="nav__toggle-label">Menú</span>
      </button>

      <div className="nav__mobile-panel" id="mobile-nav-panel">
        <ul className="nav__mobile-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav__mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
