# CLAUDE.md — El Locutorio

> Extiende el CLAUDE.md base de FLOC. Las reglas base aplican. Aquí solo lo específico.

## Proyecto

**El Locutorio** — Web de un TV show de humor con Harold Correa. Estética editorial/collage: formas SVG superpuestas con textura, halftone, tipografía expresiva (4 font families), composiciones asimétricas con elementos solapados. Por ahora solo está montado el hero.

**Build actual**: HTML estático + CSS vanilla
**Sin CMS**: Contenido estático en `index.html`
**JS/GSAP**: planificado, todavía no conectado en este workspace

## Archivos

```
index.html                 # Landing estática actual
styles/
├── fonts.css             # @font-face self-hosted
├── tokens.css            # Variables (colores, fonts, tipografía, spacing, decoración)
└── styles.css            # Reset + nav + hero + responsive
public/
├── assets/               # SVGs, PNGs y texturas
└── fonts/                # woff2 self-hosted
hero-architecture-final.md # Referencia conceptual del hero
```

---

## Estilo visual

- **Collage editorial**: formas geométricas superpuestas, rotaciones sutiles (1-3°), asimetría
- **Paleta**: Crema `#fffff0` base, azul `#3a96ff`, verde `#5ac181`, naranja `#ff4d13`, amarillo `#fdfb5e`. Saturados y directos.
- **4 fonts**: Vampiro One (display), Staatliches (condensed/UI), Rubik Dirt (accent/números), Outfit (body)
- **Texturas**: Textura de papel (`texture.png`) multiplicada sobre formas con mask SVG
- **Efectos tipográficos**: `-webkit-text-stroke` + `text-shadow` offset (sombra amarilla sólida)
- **Decorativos**: Teléfono colgando, stickers, formas rotadas

---

## Cómo construir cada sección

### Arquitectura: CSS Grid con overlap

Todas las secciones siguen este patrón. **No usar `position: absolute` masivo.**

```html
<section class="hero">
  <!-- Cada hijo directo = grid item -->
  <div class="hero__shape-blue"></div>
  <div class="hero__shape-red"></div>
  <figure class="hero__portrait">...</figure>
  <div class="hero__content">
    <!-- Flow normal dentro: headline, tagline -->
  </div>
  <div class="hero__card">...</div>
  <div class="hero__phone" aria-hidden="true">...</div>
</section>
```

```css
.hero {
  display: grid;
  grid-template-columns: /* columnas de la composición */;
  grid-template-rows: /* filas de la composición */;
  min-height: clamp(/* por sección */);
}

/* El overlap se produce por columnas/filas compartidas */
.hero__portrait   { grid-column: 1 / 4; grid-row: 1 / -1; z-index: 3; }
.hero__shape-blue { grid-column: 3 / -1; grid-row: 1 / -1; z-index: 1; }
/*                             ↑ columna 3 compartida = overlap */
```

### Los 4 tipos de grid item

| Tipo | Ejemplo | Posición | Sizing | z-index |
|------|---------|----------|--------|---------|
| **Forma** | Panel azul, panel rojo | `grid-column/row` + `transform: rotate()` | Definido por celdas | Bajo (1-2) |
| **Imagen** | Retrato Harold | `grid-column/row` + `align-self` | `max-width` en rem | Medio (3) |
| **Contenido** | Headline, card invitado | `grid-column/row` + `align-self: center` — flow normal dentro | Se adapta al contenido | Alto (4-5) |
| **Decorativo externo** | Teléfono | Grid item con `margin-top` negativo | `width` en clamp | Máximo (6) |

### Formas = SVGs exportados de Figma

Las formas geométricas NO son divs con `background-color` ni `clip-path`. Son **archivos SVG** de Figma usados como `background-image`:

```css
.hero__shape-blue {
  background: center / contain no-repeat url("/public/assets/hero-blue-panel.svg");
}
```

Si necesitas una nueva forma → exportar de Figma como SVG → `public/assets/`.

### Textura sobre formas = ::after con mask

Patrón obligatorio para todo panel/forma con textura:

```css
.hero__shape-blue::after {
  content: "";
  position: absolute;
  inset: 0;
  background: center / cover no-repeat url("/public/assets/texture.png");
  mix-blend-mode: multiply;
  opacity: 0.55;
  pointer-events: none;
  -webkit-mask: center / contain no-repeat url("/public/assets/hero-blue-panel.svg");
  mask: center / contain no-repeat url("/public/assets/hero-blue-panel.svg");
}
```

La mask recorta la textura a la forma exacta del SVG. El `multiply` integra la textura con el color.

### Responsive

Estrategia **reflow** en mobile, no scale-down.

3 breakpoints: `1024px` (tablet) · `720px` (mobile) · `420px` (mobile pequeño)

```css
/* Desktop: grid complejo con overlaps */
.section {
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr 1fr 0.8fr;
}

/* Tablet: reducir columnas, ajustar proporciones */
@media (max-width: 1024px) {
  .section { grid-template-columns: /* simplificado */; }
}

/* Mobile: reflow completo — 1 columna, contenido apilado */
@media (max-width: 720px) {
  .section {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-height: auto;
  }
}
```

Reglas de mobile:
- Quitar rotaciones si truncan texto
- Ocultar decorativos que no caben (teléfono, stickers fuera de frame)
- Mantener al menos 1-2 elementos visuales por sección
- Nunca duplicar HTML para mobile vs desktop

---

## Tipografía decorativa

### Display eyebrow (Vampiro One)
```css
.display-eyebrow {
  font-family: var(--font-display);
  color: var(--color-brand-orange);
  -webkit-text-stroke: var(--stroke-display) var(--color-brand-yellow);
  text-shadow: var(--shadow-display); /* 6px 6px amarillo sólido */
  text-transform: uppercase;
}
```

Customizable por sección via CSS custom properties:
```css
.section {
  --display-eyebrow-fill: var(--color-brand-green);
  --display-eyebrow-stroke-color: var(--color-brand-blue);
}
```

### Accent eyebrow (Vampiro One, variante más suave)
```css
.eyebrow-accent {
  font-family: var(--font-display);
  color: var(--color-brand-green);
  text-shadow: 0 4px 0 var(--color-brand-yellow);
  text-transform: uppercase;
}
```

**No inventar nuevos estilos de texto.** Usar estos dos con override de variables.

---

## Secciones

| Sección | Clase | Descripción | Capas clave |
|---------|-------|-------------|-------------|
| Hero | `.hero` | Harold + headline + card invitado + teléfono | Blue panel · Red panel · Portrait · Content · Green card · Phone |
| About | `.about` | Descripción del show, 2 cards | Shape verde · Shape azul · Cards con image overlap |
| Community | `.community` | 4 cards de pasos + portrait | ::before naranja rotado · Banner · Grid 2×2 de cards |
| Shows | `.shows` | 2 event cards + sidebar ciudades | Grid 2-col · Cards con formas SVG internas |
| Episodes | `.episodes` | Featured + lista | Grid 2-col · Featured con composición interna |
| Brands | `.brands` | 4 métricas + copy | Grid de cards con rotaciones |
| Footer | `.footer` | Logo + canales + legal | Centrado, más sencillo |

El hero tiene arquitectura detallada en `hero-architecture-final.md`. Las demás secciones se construyen una por una con screenshot de Figma + descripción de capas.

---

## Imágenes halftone

Las imágenes con efecto halftone (Harold, Luiza, invitados) vienen **pre-procesadas de Figma**.

Verificación antes de aplicar `mix-blend-mode`:
1. Abrir Figma
2. Mover la imagen sobre otro color de fondo
3. ¿El tono cambia? → blend mode real → usar `mix-blend-mode: multiply` en CSS
4. ¿No cambia? → imagen pre-procesada → usarla tal cual, sin blend mode

Si es pre-procesada, usar `drop-shadow` para integrarla:
```css
.hero__portrait img {
  filter: drop-shadow(0 3px 0 rgba(255, 255, 255, 0.9))
          drop-shadow(4px 5px 0 rgba(0, 0, 0, 0.16));
}
```

---

## GSAP

GSAP no está montado todavía en este repo. No asumir `package.json`, bundler ni entrypoint JS.

Cuando se conecte:
- crear primero la estructura JS real del proyecto
- implementar `prefers-reduced-motion` desde el inicio
- usar animaciones de entrada del hero como mejora progresiva, no como dependencia de layout
- documentar el entrypoint concreto antes de añadir más secciones

---

## Tokens

El archivo `styles/tokens.css` contiene todas las variables del proyecto. Estructura:

- **Colores**: `--color-*`
- **Fonts**: `--font-*` (4 familias)
- **Tipografía**: `--text-*` con `clamp()` (14 niveles, de `--text-ui-sm` a `--text-hero`)
- **Line-height**: `--lh-*` unitless (tight, heading, body, relaxed)
- **Spacing**: `--space-*` en rem, escala base-4 (de `--space-1` 4px a `--space-32` 128px)
- **Section spacing**: `--section-pad-*` con `clamp()`
- **Decoración**: `--stroke-*`, `--shadow-*`, `--motion-*`, `--focus-ring`

### Regla: No hardcodear valores

Si necesitas un valor de tipografía, spacing, color → usa un token. Si no hay token adecuado → propón crearlo en `styles/tokens.css`. No hardcodear.

### Regla: clamp() siempre con offset rem

```css
/* BIEN */
clamp(6rem, 5.208rem + 3.38vw, 8.25rem)

/* MAL — sin offset rem, falla zoom */
clamp(6rem, 7.2vw, 8.25rem)
```

---

## Lo que NO hacer

- No convertir composiciones a flexbox plano. El overlap con grid es intencional.
- No quitar rotaciones. Son el lenguaje visual.
- No crear formas con `clip-path` o divs con color. Exportar SVG de Figma.
- No aplicar `mix-blend-mode` sin verificar en Figma primero.
- No reintroducir valores en px (salvo borders, shadows, media queries, <4px).
- No añadir smooth scroll library. GSAP ScrollTrigger maneja el scroll.
- No alinear todo al centro en mobile. Mantener asimetría donde sea posible.
- No inventar font combinations. Son 4 familias definidas, cada una con su rol.
- No usar `Inter` — no está en el proyecto, `--font-body` (Outfit) cubre UI.

---

## Autonomía

### Actúa sin preguntar
- Aplicar tokens existentes donde hay valores hardcoded
- Limpiar console.logs, código comentado, imports muertos
- Añadir alt text descriptivo
- Aplicar `--lh-*` donde hay line-height en números sueltos
- Usar pattern de textura `::after + mask` para nuevos paneles

### Propón y espera confirmación
- Crear nuevos tokens
- Crear nuevas secciones o componentes
- Cambiar el grid de una sección
- Instalar dependencias
- Decisiones de diseño no explícitas en Figma
- Cambiar estrategia responsive de una sección
- Crear nuevos archivos SVG (deberían venir de Figma)

### Nunca hagas
- Deploy
- Modificar .env
- Reescribir secciones enteras sin que se te pida
- Eliminar archivos
- Fabricar SVGs de formas — siempre exportar de Figma

---

## Checklist pre-entrega

- 0 `console.log`
- 0 lorem ipsum / datos placeholder
- `grep -rn "px" --include="*.css"` → solo borders, shadows, media queries, <4px
- Todos los clamp() con offset rem
- Favicon y meta tags del cliente (no defaults de Vite)
- Links verificados (0 rotos)
- Lighthouse performance ≥ 80
- `prefers-reduced-motion` activo
- Textos legibles en 375px (body ≥ 16px)
- 0 scroll horizontal en ningún breakpoint
