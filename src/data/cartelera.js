/**
 * Cartelera de películas — Datos reales de TMDB
 * Fuentes: themoviedb.org — consultar popular, upcoming y showtimes
 * Todos los pósters y backdrops son imágenes locales optimizadas en WebP
 * Ver CREDITS.md para atribuciones completas
 */

const movies = [
  {
    id: 1,
    title: 'Wicked: For Good',
    poster: '/assets/posters/wicked-for-good.webp',
    backdrop: '/assets/backdrops/wicked-for-good.webp',
    synopsis:
      'La conclusión épica de la historia de las brujas de Oz. Glinda y Elphaba enfrentan las consecuencias de sus elecciones mientras una amenaza creciente pone en peligro todo el Mágico País. Juntas deberán descubrir que la verdadera magia reside en la unión.',
    ageRating: 'PG',
    score: 4.8,
    showtimes: ['14:00', '16:30', '19:00', '21:30'],
    genres: ['Musical', 'Fantasía', 'Drama'],
    runtime: '144 min',
    releaseDate: '2025-11-21',
    trailer: 'https://www.youtube.com/embed/vt98AlBDI9Y',
    featured: true,
  },
  {
    id: 2,
    title: 'Zootopia 2',
    poster: '/assets/posters/zootopia-2.webp',
    backdrop: '/assets/backdrops/zootopia-2.webp',
    synopsis:
      'Judy Hopps y Nick Wilde regresan en una nueva aventura llena de misterio y comedia. Cuando un caso inesperado pone en peligro la ciudad más diversa del mundo, la dupla deberá enfrentar desafíos que pondrán a prueba su amistad.',
    ageRating: 'PG',
    score: 4.6,
    showtimes: ['14:30', '17:00', '19:30', '22:00'],
    genres: ['Animación', 'Comedia', 'Aventura'],
    runtime: '108 min',
    releaseDate: '2025-11-26',
    trailer: 'https://www.youtube.com/embed/J13BsdX7JZU',
  },
  {
    id: 3,
    title: 'Predator: Badlands',
    poster: '/assets/posters/predator-badlands.webp',
    backdrop: '/assets/backdrops/predator-badlands.webp',
    synopsis:
      'En un planeta remoto, un joven Predator exiliado de su clan encuentra una aliada inesperada. Juntos emprenderán un viaje peligroso en busca del adversario definitivo mientras son perseguidos por cazadores implacables.',
    ageRating: 'R',
    score: 4.4,
    showtimes: ['15:00', '18:00', '21:00', '23:30'],
    genres: ['Acción', 'Ciencia Ficción', 'Terror'],
    runtime: '115 min',
    releaseDate: '2025-11-07',
    trailer: 'https://www.youtube.com/embed/43R9l7EkJwE',
  },
  {
    id: 4,
    title: 'The Running Man',
    poster: '/assets/posters/the-running-man.webp',
    backdrop: '/assets/backdrops/the-running-man.webp',
    synopsis:
      'En un futuro distópico donde la televisión controla las masas, un hombre inocente es forzado a participar en un mortal reality show donde los concursantes deben huir de cazadores letales. Solo la valentía puede cambiar el sistema.',
    ageRating: 'R',
    score: 4.2,
    showtimes: ['16:00', '19:00', '22:00'],
    genres: ['Acción', 'Ciencia Ficción', 'Thriller'],
    runtime: '111 min',
    releaseDate: '2025-11-14',
    trailer: 'https://www.youtube.com/embed/KD18ddeFuyM',
  },
  {
    id: 5,
    title: 'Now You See Me: Now You Don\'t',
    poster: '/assets/posters/now-you-see-me-now-you-dont.webp',
    backdrop: '/assets/backdrops/now-you-see-me-now-you-dont.webp',
    synopsis:
      'La Cuarteta de Caballeros regresa con ilusiones aún más impresionantes. Cuando un misterioso magnate de la tecnología desafía sus habilidades, los magos deben combinar artes ancestrales con tecnología de vanguardia en una carrera contra el tiempo.',
    ageRating: 'PG-13',
    score: 4.1,
    showtimes: ['15:30', '18:00', '20:30', '23:00'],
    genres: ['Thriller', 'Acción', 'Misterio'],
    runtime: '130 min',
    releaseDate: '2025-11-14',
    trailer: 'https://www.youtube.com/embed/-E3lMRx7HRQ',
  },
  {
    id: 6,
    title: 'TRON: Ares',
    poster: '/assets/posters/tron-ares.webp',
    backdrop: '/assets/backdrops/tron-ares.webp',
    synopsis:
      'Una entidad digital única es enviada desde el Mundo Digital hacia la Tierra para cumplir una misión que transformará ambos mundos. En un paisaje visual revolucionario, los límites entre la realidad y lo digital se desvanecen.',
    ageRating: 'PG-13',
    score: 4.0,
    showtimes: ['14:45', '17:30', '20:15'],
    genres: ['Ciencia Ficción', 'Acción', 'Aventura'],
    runtime: '125 min',
    releaseDate: '2025-10-10',
    trailer: 'https://www.youtube.com/embed/zvahPW14Qos',
  },
  {
    id: 7,
    title: 'Avatar: Fire and Ash',
    poster: '/assets/posters/avatar-fire-and-ash.webp',
    backdrop: '/assets/backdrops/avatar-fire-and-ash.webp',
    synopsis:
      'James Cameron regresa con la tercera entrega de la saga más taquillera de la historia del cine. La familia Sully se enfrenta a una nueva tribu en Pandora con poderes elementales inigualables. La batalla por la supervivencia continúa.',
    ageRating: 'PG-13',
    score: 4.9,
    showtimes: ['14:00', '17:30', '21:00'],
    genres: ['Ciencia Ficción', 'Aventura', 'Fantasía'],
    runtime: '190 min',
    releaseDate: '2025-12-19',
    trailer: 'https://www.youtube.com/embed/nb_fFj_0rq8',
  },
  {
    id: 8,
    title: 'Springsteen: Deliver Me From Nowhere',
    poster: '/assets/posters/springsteen-deliver-me-from-nowhere.webp',
    backdrop: '/assets/backdrops/springsteen-deliver-me-from-nowhere.webp',
    synopsis:
      'La historia íntima de cómo Bruce Springsteen creó su álbum más aclamado grabado en un bedroom a finales de los 70. Timothée Chalamet da vida al icono del rock en esta película sobre creatividad, presión y la búsqueda de la perfección artística.',
    ageRating: 'R',
    score: 4.3,
    showtimes: ['16:00', '19:00', '22:00'],
    genres: ['Drama', 'Musical', 'Biografía'],
    runtime: '118 min',
    releaseDate: '2025-10-24',
    trailer: 'https://www.youtube.com/embed/oQXdM3J33No',
  },
]

export default movies
