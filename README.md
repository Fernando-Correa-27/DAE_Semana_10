# 🎬 Cartelera de Cine

Proyecto académico de ReactJS — **DAE Semana 10: Componentes y eventos**.

Aplicación de cartelera de cine con película destacada, búsqueda integrada en el
banner, filtros combinados, favoritos persistentes y detalle de película en una
ventana modal accesible.

## Tecnologías

- **Vite** — build y servidor de desarrollo.
- **React 19** — componentes funcionales y hooks.
- **prop-types** — validación de props en desarrollo.
- **CSS nativo** — tokens, BEM y diseño responsive mobile-first.
- **Vitest + Testing Library + jsdom** — pruebas de componentes y hooks.
- **Playwright** — capturas de evidencia en un navegador real.

## Características

- **8 películas** con datos locales, pósteres WebP, sinopsis, clasificación,
  puntuación, géneros, horarios y tráiler.
- **Componente `Button` reutilizable** con variantes `primary`, `secondary` y
  `ghost`, tamaños, modo icono y ancho completo. Ningún `<button>` se escribe a
  mano fuera de ese componente.
- **Favoritos controlados desde `App`**: el estado guarda únicamente IDs y
  `MovieCard` no tiene estado propio.
- **Persistencia en `localStorage`** con lectura perezosa, escritura tolerante a
  errores y recuperación ante datos corruptos.
- **Búsqueda controlada** mediante `MovieSearch`, integrada en el banner junto a
  las llamadas a la acción.
- **Debounce de 300 ms** con `useDebounce` para no filtrar en cada pulsación.
- **Filtrado derivado** por texto y género, sin guardar la lista filtrada en el
  estado, con contador accesible y estado vacío reutilizable.
- **`MovieDetailModal`**: portal en `document.body`, fondo atenuado, scroll
  interno, cierre con X/Escape/fondo, retorno de foco, bloqueo del scroll,
  trampa de foco, `aria-modal` y `aria-labelledby`, póster con `aspect-ratio` y
  fallback, metadatos separados, fecha en español de Perú, chips de géneros y
  horarios, y tráiler validado o mensaje de disponibilidad.
- **Tema claro/oscuro** y diseño responsive probado a 360, 768 y 1280 px.

## Arquitectura

```text
src/
├── components/
│   ├── Button/            → Botón reutilizable y sus variantes
│   ├── EmptyState/        → Estado vacío anunciado con aria-live
│   ├── Footer/            → Pie de página
│   ├── Header/            → Marca, navegación y cambio de tema
│   ├── Hero/              → Banner, carrusel y búsqueda
│   ├── MovieCard/         → Tarjeta sin estado propio
│   ├── MovieDetailModal/  → Detalle accesible en portal
│   ├── MovieList/         → Grid, filtro de género y contador
│   └── MovieSearch/       → Input de búsqueda controlado
├── data/
│   └── cartelera.js       → Datos locales de las películas
├── hooks/
│   └── useDebounce.js     → Retraso reutilizable de valores
├── styles/
│   ├── variables.css      → Tokens de diseño
│   ├── reset.css          → Normalización
│   ├── base.css           → Tipografía y utilidades
│   └── component-overrides.css
├── test/
│   └── setup.js           → Configuración de Testing Library
├── utils/
│   ├── constants.js       → Textos de interfaz (claves en inglés)
│   └── formatters.js      → Fechas es-PE y validación de tráileres
├── App.jsx                → Estado y composición principal
└── main.jsx               → Punto de entrada
```

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

La aplicación queda disponible en la URL que imprime Vite (por defecto
`http://localhost:5173`).

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run lint       # oxlint
npm test           # pruebas con Vitest
npm run build      # build de producción
npm run preview    # sirve el build
```

## Pruebas

Las pruebas cubren:

- Apertura y contenido del detalle de película.
- Cierre con botón, Escape y clic en el fondo.
- Retorno de foco al elemento que abrió el modal.
- Bloqueo y restauración del scroll del fondo.
- Ausencia de tráiler y rechazo de URLs no seguras.
- Fallback del póster cuando la imagen falla.
- Comportamiento controlado de `MovieSearch`, `EmptyState` y `useDebounce`.
- Formato de fecha `es-PE` y validación de URLs de tráiler.

## Accesibilidad

- HTML semántico y landmarks (`header`, `main`, `footer`, `section`).
- Etiquetas accesibles en todos los controles.
- Foco visible y navegación completa por teclado.
- Modal con foco atrapado, cierre con Escape y retorno de foco.
- `aria-live` para el contador y el estado vacío.
- Iconos decorativos con `aria-hidden="true"` y tamaño explícito.
- Respeto a `prefers-reduced-motion`.

## Alcance del laboratorio

El proyecto es una aplicación frontend: no incluye backend Django ni requiere
variables de entorno. Por eso `python manage.py check` y
`makemigrations --check` no aplican. El archivo `.env.example` documenta un
override opcional del título de la aplicación y no contiene secretos.

Los pasos 2 a 10 del laboratorio se reflejan en los commits del repositorio,
desde los estilos base y el `Button` reutilizable hasta la persistencia de
favoritos. El detalle de película se implementa en `MovieDetailModal` y se abre
desde las tarjetas y desde el banner.

## Evidencia

Las capturas de la interfaz se encuentran en
[`docs/lab-10/evidence/`](docs/lab-10/evidence/). La entrega escrita está en
[`docs/lab-10/deliverable.md`](docs/lab-10/deliverable.md).

## Datos y créditos

Los datos y las imágenes se usan con fines educativos. Consulta
[`CREDITS.md`](CREDITS.md) para las atribuciones.

## Autor

Fernando Correa Huincho — Fernando-Correa-27
