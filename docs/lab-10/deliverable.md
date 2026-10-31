# Entrega del Laboratorio — Semana 10: Componentes y eventos

Proyecto: **Cartelera de Cine** (React + Vite).
Repositorio: `https://github.com/Fernando-Correa-27/DAE_Semana_10`.

## 1. Tabla de estados

| Estado | Tipo | Ubicación | Persistencia | Actualización |
|---|---|---|---|---|
| `theme` | `'light' \| 'dark'` | `src/App.jsx` | `localStorage['theme']` | `setTheme(valor)` con lectura perezosa |
| `favoriteIds` | `number[]` (solo IDs) | `src/App.jsx` | `localStorage['favorites']` como JSON | `setFavoriteIds(prev => ...)` funcional |
| `searchQuery` | `string` | `src/App.jsx` | Ninguna | `setSearchQuery(texto)` desde `MovieSearch` |
| `debouncedSearch` | `string` | `src/hooks/useDebounce.js` | Ninguna | `useEffect` + `setTimeout` de 300 ms |
| `genreFilter` | `string` | `src/App.jsx` | Ninguna | `setGenreFilter(género)` |
| `selectedMovieId` | `number \| null` | `src/App.jsx` | Ninguna | `setSelectedMovieId(id)` |
| `detailSection` | `'details' \| 'trailer'` | `src/App.jsx` | Ninguna | Se define al abrir el detalle |
| `heroIndex` | `number` | `src/App.jsx` | Ninguna | Carrusel y controles del banner |

### Reglas de estado

1. `theme` y `favoriteIds` se inicializan con una función (lectura perezosa) para
   tocar `localStorage` solo en el primer render.
2. Las actualizaciones de favoritos usan la forma funcional
   `setFavoriteIds((prev) => ...)` para evitar perder cambios rápidos.
3. Los favoritos guardan **solo IDs**, nunca objetos completos de película.
4. La lista filtrada es un valor derivado con `useMemo`; no se guarda en el
   estado. El filtro de texto usa `debouncedSearch`, no cada pulsación.
5. `MovieCard` es un componente sin estado: recibe `isFavorite`,
   `onToggleFavorite` y las acciones de detalle por props.

## 2. Reutilización

### `Button`

- Archivo: `src/components/Button/Button.jsx`.
- Variantes: `primary`, `secondary`, `ghost`.
- Tamaños: `sm`, `md`, `lg`; modificadores `iconOnly` y `fullWidth`.
- Se usa en `Header`, `Hero`, `MovieCard`, `MovieSearch`, `MovieList`,
  `EmptyState` y `MovieDetailModal`.
- El único `<button>` nativo del proyecto está dentro de `Button.jsx`.

### `MovieSearch`

- Archivo: `src/components/MovieSearch/MovieSearch.jsx`.
- Componente controlado: recibe `value` y `onChange`; no guarda la consulta.
- Incluye etiqueta accesible, icono decorativo y botón de limpieza reutilizable.
- Se integra en el banner, junto a las llamadas a la acción.

### `useDebounce`

- Archivo: `src/hooks/useDebounce.js`.
- Recibe un valor y un retardo (300 ms por defecto).
- Limpia el temporizador en cada cambio y al desmontar.

```js
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

### `EmptyState`

- Archivo: `src/components/EmptyState/EmptyState.jsx`.
- Panel reutilizable para listas sin resultados.
- Anuncia el cambio con `role="status"` y `aria-live="polite"`.
- Ofrece una acción opcional para limpiar la búsqueda.

### `MovieDetailModal`

- Archivo: `src/components/MovieDetailModal/MovieDetailModal.jsx`.
- Se renderiza con `createPortal` en `document.body`, fuera del flujo normal.
- Cierra con la X, Escape o clic en el fondo; devuelve el foco al disparador.
- Bloquea el scroll del fondo y mantiene el foco dentro del diálogo.
- Usa `aria-modal="true"` y `aria-labelledby`.
- El póster tiene `aspect-ratio: 2/3` y fallback local con `onError`.
- La fecha se formatea con `Intl.DateTimeFormat('es-PE')` y `timeZone: 'UTC'`.
- Solo embebe tráileres HTTPS de YouTube/Vimeo; si no hay URL válida muestra
  «Tráiler no disponible».

## 3. Flujo del debounce

1. El usuario escribe en `MovieSearch`; `App` actualiza `searchQuery` en cada
   pulsación para que el input siga siendo controlado.
2. `useDebounce(searchQuery, 300)` reinicia el temporizador en cada cambio.
3. Al pasar 300 ms sin escritura, `debouncedSearch` cambia.
4. El `useMemo` de `filteredMovies` se recalcula con `debouncedSearch` y
   `genreFilter`.
5. `MovieList` recibe la lista ya derivada, muestra el contador y, si queda
   vacía, renderiza `EmptyState`.
6. El botón de limpieza vacía `searchQuery`; el debounce propaga el cambio y se
   recupera la lista completa.

## 4. Casos de prueba

| # | Caso | Resultado |
|---|---|---|
| 1 | Apertura del detalle desde una tarjeta | Modal centrado, con portal y estilos |
| 2 | Apertura desde «Ver Detalles» del banner | Mismo modal, película correcta |
| 3 | Cierre con la X | El diálogo desaparece y el foco vuelve al disparador |
| 4 | Cierre con Escape | El diálogo desaparece |
| 5 | Cierre con clic en el fondo | El diálogo desaparece; el clic interno no lo cierra |
| 6 | Foco atrapado y scroll bloqueado | Tab circula dentro; el fondo no se desplaza |
| 7 | Película sin tráiler | Se muestra «Tráiler no disponible», sin iframe vacío |
| 8 | Tráiler con URL no segura | Se rechaza y se muestra el mensaje |
| 9 | Póster roto | `onError` cambia a `/assets/posters/fallback.svg` |
| 10 | Favorito desde la tarjeta | `aria-pressed` cambia y el ID se guarda |
| 11 | Recarga de la página | Los favoritos se restauran desde `localStorage` |
| 12 | JSON corrupto en favoritos | La app inicia sin fallar y usa una lista vacía |
| 13 | Búsqueda con debounce | El filtro se aplica después de 300 ms |
| 14 | Búsqueda sin coincidencias | `EmptyState` anuncia el resultado y permite limpiar |
| 15 | Filtro por género | La lista se reduce sin guardar una lista duplicada en estado |
| 16 | Navegación por teclado | Foco visible en botones, inputs y modal |
| 17 | Responsive 360/768/1280 | Sin desbordamiento horizontal; detalle apilado/2 columnas |
| 18 | Consola y red | Sin errores, advertencias ni 404 en los estados revisados |

Resultado de la suite automatizada: **31 pruebas aprobadas** en 5 archivos
(componente de detalle, búsqueda, estado vacío, debounce y formateadores).

## 5. Capturas de evidencia

Las imágenes están en `docs/lab-10/evidence/`:

| Archivo | Descripción |
|---|---|
| `screenshot-01-homepage.jpeg` | Inicio en escritorio con banner y búsqueda integrada |
| `screenshot-02-search-results.jpeg` | Búsqueda «zootopia» con contador correcto |
| `screenshot-03-movie-detail.jpeg` | Detalle modal en escritorio |
| `screenshot-04-favorites.jpeg` | Favorito marcado en una tarjeta |
| `screenshot-05-empty-state.jpeg` | Estado vacío del buscador |
| `screenshot-06-responsive-768.jpeg` | Inicio a 768 px |
| `screenshot-06-responsive-360.jpeg` | Inicio a 360 px |
| `screenshot-07-detail-768.jpeg` | Detalle a 768 px |
| `screenshot-07-detail-360.jpeg` | Detalle a 360 px |
| `screenshot-08-trailer-section.jpeg` | Acceso al tráiler desde el banner |

## 6. Decisiones de diseño

1. **Array de IDs para favoritos**: se serializa directamente como JSON, evita
   guardar objetos duplicados y mantiene la tarjeta sin estado.
2. **Lectura perezosa y validación** de `localStorage`: si el valor no es un
   array de IDs válidos, se descarta y la aplicación sigue funcionando.
3. **Filtrado derivado**: la fuente de verdad es `searchQuery` +
   `genreFilter`; la lista filtrada nunca se escribe en el estado.
4. **Debounce de 300 ms**: equilibra respuesta percibida y costo de filtrado.
5. **Portal para el detalle**: garantiza que el modal no quede dentro del pie de
   página ni del flujo del documento.
6. **Lista de hosts permitidos para tráileres**: evita inyectar URLs arbitrarias
   en el `iframe`.
7. **Fecha con `timeZone: 'UTC'`**: evita que un día se muestre desplazado por
   la zona horaria del navegador.
8. **Tokens existentes**: se conservaron los colores cinematográficos rojo/oro
   de la marca en lugar de reemplazarlos por una paleta genérica.

## 7. Defectos corregidos

| Severidad | Defecto | Corrección |
|---|---|---|
| Alta | El detalle se dibujaba al final de la página, después del pie | `MovieDetailModal` con portal, overlay y scroll interno |
| Alta | Los estilos del detalle no se cargaban | CSS importado por el componente y clases coherentes |
| Alta | Póster roto en el detalle | Campo `poster` correcto, `aspect-ratio` y `onError` con fallback |
| Alta | Estrella SVG de 1280 × 1280 | Tamaño CSS fijo de 16 px y `aria-hidden` |
| Media | Metadatos pegados («PG144 min4.82025-11-21») | Filas separadas, etiquetas y fecha formateada |
| Media | Caja de tráiler vacía | Validación de URL y mensaje alternativo |
| Media | «1 resultadoencontrado» | Contador con espacio y singular/plural correctos |
| Media | Botón de tema sin icono visible | `Button` con icono SVG dimensionado |
| Media | Dos buscadores y dos selectores de género | Búsqueda única en el banner y un solo filtro en la lista |
| Media | «Limpiar búsqueda» no usaba `Button` | `Button` reutilizable en `MovieSearch` y `EmptyState` |
| Baja | Pie de página decía «Semana 9» | Texto actualizado a Semana 10 |
| Baja | Póster «Zootrópolis 2» frente al título «Zootopia 2» | Se documenta como diferencia del material gráfico; el dato de la película se mantiene |

## 8. Verificación

- `npm run lint`: sin errores ni advertencias.
- `npm run build`: build de producción correcto.
- `npm test`: 31 pruebas aprobadas.
- Revisión en navegador a 360, 768 y 1280 px.
- Consola sin errores ni advertencias en los estados capturados.
- Sin recursos 404 en los estados capturados.

### Nota sobre Django

El repositorio es una aplicación frontend y no incluye un backend Django. Por
eso `python manage.py check` y `python manage.py makemigrations --check` no
aplican. No se inventó un backend para el laboratorio.

## 9. Supuestos

- Los datos de películas son locales y no dependen de una API externa.
- El tráiler se muestra solo si la URL es un embed HTTPS de YouTube o Vimeo.
- La preferencia de tema y los favoritos son locales al navegador.
- Las capturas se generan con Playwright sobre el servidor de Vite.
