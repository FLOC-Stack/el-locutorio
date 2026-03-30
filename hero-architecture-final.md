# Arquitectura final — Hero El Locutorio

## La idea

CSS Grid donde las áreas se solapan por diseño. Cada capa del collage es un grid item que ocupa filas y columnas que se cruzan con otras. Tienes el overlapping del absolute positioning pero con la mantenibilidad del grid: para responsive, solo redefinís `grid-template`.

No hay coordenadas mágicas. No hay 100 reglas de posición. El collage se define en la estructura del grid, no en los px de cada elemento.

---

## HTML

```html
<section class="hero">
  <div class="hero__shape-blue"></div>
  <div class="hero__shape-red"></div>

  <figure class="hero__portrait">
    <img src="/images/harold-halftone.webp"
         alt="Harold Correa, presentador de El Locutorio"
         width="620" height="780" />
  </figure>

  <div class="hero__content">
    <h1 class="hero__headline">Con Harold Correa</h1>
    <p class="hero__tagline">Humor inteligente · Conversación incómoda · Comunidad real</p>
  </div>

  <div class="hero__card">
    <figure class="hero__guest">
      <img src="/images/luiza-halftone.webp"
           alt="Luiza Bacceli"
           width="160" height="160" />
    </figure>
    <div class="hero__guest-info">
      <span class="hero__guest-label">Entrevistamos a</span>
      <strong class="hero__guest-name">Luiza Bacceli</strong>
      <a href="#" class="hero__guest-cta">
        <svg><!-- icono youtube --></svg>
        Play para ver el shows en vivo
      </a>
    </div>
  </div>

  <div class="hero__phone" aria-hidden="true">
    <img src="/images/phone.webp" alt="" width="180" height="400" />
  </div>
</section>
```

Semántico, plano, sin wrappers innecesarios. Cada elemento es un grid item directo.

---

## Grid Desktop (1440px)

```
        1     2     3     4     5     6     7     8
      ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
  1   │     │     │     │     │     │     │     │phone│
      │     │ RED │     │     │     │     │     │     │
  2   │     │█████│     │  BLUE (diagonal)       │     │
      │     │█████│PORTRAIT   │     │     │     │     │
  3   │     │█████│     │     │ HEADLINE          │     │
      │     │     │     │     │     │     │     │     │
  4   │     │     │     │     │ TAGLINE           │     │
      │     │     │     │     │     │     │     │     │
  5   │     │     │     │     │  CARD VERDE        │     │
      │     │     │     │     │     │     │     │     │
      └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

Los items se solapan donde las áreas se cruzan. El retrato cruza sobre el rojo y el azul. El headline está sobre el azul. La card verde se monta sobre el azul y el retrato.

---

## CSS

```css
/* === TOKENS (en tokens.css) === */

:root {
  --color-cream: #f5f0e8;
  --color-red: #e8512f;
  --color-blue: #4a90d9;
  --color-green: #2d8a4e;
  --color-green-bright: #7ec242;
  --color-dark: #1a1a1a;
}


/* === GRID CONTAINER === */

.hero {
  display: grid;
  /* 8 columnas fluidas — la grid implícita del collage */
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr 1fr 0.8fr;
  grid-template-rows: auto 1fr 1fr 1fr 1.2fr;
  min-height: clamp(30rem, 56vw, 52rem);
  background: var(--color-cream);
  overflow: visible; /* el teléfono sale */
  position: relative; /* para el grain overlay si lo añades */
}


/* === FORMA AZUL === */
/* Ocupa la mitad derecha, se extiende casi todo el alto */
/* La diagonal se logra con clip-path */

.hero__shape-blue {
  grid-column: 3 / -1;
  grid-row: 1 / -1;
  background: var(--color-blue);
  /* Diagonal: corta la esquina superior-izquierda */
  clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
  z-index: 1;
}


/* === FORMA ROJA === */
/* Rectángulo rotado a la izquierda */

.hero__shape-red {
  grid-column: 1 / 4;
  grid-row: 1 / 5;
  background: var(--color-red);
  transform: rotate(-2deg);
  /* Margins negativos para que la rotación no deje huecos */
  margin: 5% 15% 10% 5%;
  z-index: 2;
}


/* === RETRATO === */
/* Cruza sobre el rojo y el azul — el overlap es natural del grid */

.hero__portrait {
  grid-column: 1 / 4;
  grid-row: 1 / -1;
  z-index: 3;
  /* Alinear dentro de su celda */
  align-self: end;
  justify-self: start;
  padding-left: 5%;
  margin-bottom: -3%; /* sangra ligeramente fuera de su fila */
}

.hero__portrait img {
  width: 100%;
  max-width: 32rem;
  height: auto;
  /* Verificar en Figma si es blend mode real o imagen pre-procesada */
  /* Si es pre-procesada, quitar esta línea */
  mix-blend-mode: multiply;
}


/* === CONTENIDO (headline + tagline) === */
/* Flow normal DENTRO de su celda — no absolute */

.hero__content {
  grid-column: 4 / 8;
  grid-row: 2 / 5;
  z-index: 4;
  /* Alinear dentro de la celda */
  align-self: center;
  padding: var(--space-6);
}

.hero__headline {
  font-family: 'LocutorioDisplay', sans-serif;
  font-size: var(--fs-hero);
  line-height: 0.9;
  color: var(--color-green-bright);
  text-transform: uppercase;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
  transform: rotate(-1deg);
  transform-origin: left center;
}

.hero__tagline {
  font-family: 'LocutorioDisplay', sans-serif;
  font-size: var(--fs-h3);
  color: var(--color-green-bright);
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  margin-top: var(--space-4);
  transform: rotate(-1deg);
}


/* === CARD INVITADO === */
/* Se monta sobre la zona inferior — overlap con portrait y azul */

.hero__card {
  grid-column: 4 / 8;
  grid-row: 4 / -1;
  z-index: 5;
  align-self: end;

  background: var(--color-green);
  transform: rotate(1.5deg);
  padding: var(--space-6);
  margin-bottom: 5%;

  /* Layout interno — esto SÍ es flexbox */
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.hero__guest img {
  width: clamp(5rem, 8vw, 8rem);
  height: auto;
  border-radius: 50%;
}

.hero__guest-name {
  font-family: 'LocutorioDisplay', sans-serif;
  font-size: var(--fs-h2);
  color: var(--color-green-bright);
  text-transform: uppercase;
  display: block;
}

.hero__guest-label {
  font-size: var(--fs-small);
  text-transform: uppercase;
  letter-spacing: var(--ls-caps);
  color: var(--color-cream);
}

.hero__guest-cta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--fs-small);
  color: var(--color-cream);
  text-decoration: none;
  margin-top: var(--space-2);
}


/* === TELÉFONO === */
/* Fuera del grid visualmente, anclado arriba-derecha */

.hero__phone {
  grid-column: 8;
  grid-row: 1 / 3;
  z-index: 6;
  justify-self: end;
  /* Sale por arriba del hero */
  margin-top: -15%;
  transform-origin: top center;
}

.hero__phone img {
  width: clamp(4rem, 8vw, 10rem);
  height: auto;
}


/* ============================================ */
/*  RESPONSIVE                                   */
/* ============================================ */

/* --- Tablet (1024px) --- */
/* Misma composición, grid más compacto */

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr 1.2fr 1.2fr 1fr 1.2fr 1.2fr 1fr 0.6fr;
    min-height: clamp(28rem, 50vw, 40rem);
  }

  .hero__content {
    grid-column: 3 / 8; /* más ancho para compensar */
  }

  .hero__card {
    grid-column: 3 / 8;
  }
}


/* --- Mobile (720px) --- */
/* REFLOW COMPLETO — ya no es collage, es stack con personalidad */

@media (max-width: 720px) {
  .hero {
    /* Grid completamente diferente: 1 columna, filas por contenido */
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    min-height: auto; /* el contenido dicta la altura */
    overflow: hidden;
    padding: var(--space-4);
    gap: var(--space-4);
  }

  /* El azul pasa a ser un background parcial, no una forma cortada */
  .hero__shape-blue {
    grid-column: 1;
    grid-row: 1 / -1;
    clip-path: none;
    opacity: 0.08; /* sutil, como tinte de fondo */
  }

  /* El rojo se convierte en acento detrás del retrato */
  .hero__shape-red {
    grid-column: 1;
    grid-row: 1 / 2;
    margin: 0;
    transform: rotate(-3deg);
    height: 80%;
    align-self: center;
    justify-self: center;
    width: 65%;
  }

  /* Retrato: centrado, tamaño controlado */
  .hero__portrait {
    grid-column: 1;
    grid-row: 1;
    z-index: 3;
    justify-self: center;
    align-self: center;
    padding: 0;
    margin: 0;
  }

  .hero__portrait img {
    width: clamp(12rem, 50vw, 18rem);
    max-width: none;
  }

  /* Contenido: apilado debajo */
  .hero__content {
    grid-column: 1;
    grid-row: 2;
    padding: 0;
    text-align: center;
  }

  .hero__headline,
  .hero__tagline {
    transform: none; /* sin rotación en mobile */
  }

  /* Card: ancho completo, sin rotación */
  .hero__card {
    grid-column: 1;
    grid-row: 3;
    transform: none;
    margin: 0;
  }

  /* Teléfono: fuera en mobile */
  .hero__phone {
    display: none;
  }
}


/* --- Mobile pequeño (375px) --- */

@media (max-width: 420px) {
  .hero__headline {
    font-size: var(--fs-h1); /* reducir escala de hero a h1 */
  }

  .hero__card {
    flex-direction: column;
    text-align: center;
  }
}


/* ============================================ */
/*  GRAIN OVERLAY (opcional)                     */
/* ============================================ */

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

---

## Por qué esto funciona

### 1. El overlap es estructural, no accidental

```
grid-column: 1 / 4   ← retrato
grid-column: 3 / -1  ← azul
                 ↑
           columna 3 compartida = overlap
```

No necesitas absolute + coordenadas mágicas. El overlap se define en qué columnas comparten. Si mañana quieres que el retrato se solape más con el azul, cambias `1 / 4` por `1 / 5`. Una propiedad, no cinco.

### 2. El contenido fluye dentro de su celda

`hero__content` tiene `align-self: center`. Si el headline crece (nombre más largo, otro idioma), la celda lo absorbe. No se sale, no se solapa con lo que no debe. El grid estira la fila si hace falta.

### 3. Responsive = redefinir el grid, no 50 overrides

Desktop: 8 columnas, items repartidos con solapamiento.
Mobile: 1 columna, items apilados. Mismo HTML, otra `grid-template`.

No hay 100 reglas de `left/top/width` que ajustar por breakpoint. Hay UNA definición de grid por breakpoint.

### 4. Las formas decorativas siguen siendo grid items

El rojo y el azul son grid items como cualquier otro. Su posición se define con `grid-column/row`, no con `position: absolute`. La rotación y el clip-path son visuales, no posicionales.

### 5. El teléfono es la única excepción

Sale del container con `margin-top: -15%`. Es el único elemento que necesita "romper" el grid. Todo lo demás vive dentro.

---

## Cómo replicar en las otras 5 secciones

El patrón es el mismo para cada sección:

1. **Define el grid de la sección** — cuántas columnas y filas necesita
2. **Asigna cada elemento visual a sus columnas/filas** — los overlaps salen de columnas compartidas
3. **Formas decorativas = grid items** con transform y clip-path
4. **Contenido = grid items** con align-self y flow interno
5. **Mobile = grid de 1 columna** con reflow completo

```css
/* Patrón base para cada sección */
.section {
  display: grid;
  grid-template-columns: /* definir por sección */;
  grid-template-rows: /* definir por sección */;
  min-height: clamp(/* por sección */);
  position: relative; /* solo para ::after grain */
  overflow: hidden;   /* o visible si algo sale */
}

/* Cada hijo directo = grid item con grid-column + grid-row + z-index */
```

---

## Lo que queda por decidir en implementación

1. **Verificar blend mode del retrato en Figma** — si la imagen ya viene procesada, quitar `mix-blend-mode: multiply`
2. **La forma azul** — ¿`clip-path: polygon()` es suficiente o hay que exportar SVG de Figma para la diagonal exacta?
3. **Font display** — necesito el nombre de la font custom y el archivo woff2
4. **Las proporciones del grid** — los valores de `grid-template-columns` que puse son un punto de partida, hay que ajustar comparando con Figma
