export default class MovieService {
  constructor() {
    this._apiKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDVmYTY2YjViMzZlZGYxZThiYjFiYTNkMWZmZGQ4ZiIsInN1YiI6IjY2NDhlYzU0NWRlOTkyYjM5MDk1YmQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0JrmpG_r8AdNH8ye4CvmtobYsiiuyR1ZucXV6zVaUiU';

    this._apiUrl = 'https://api.themoviedb.org/3/search/movie';

    this._query = '&include_adult=false&language=en-US&page=1';
  }

  async getMovies(title) {
    const response = await fetch(`${this._apiUrl}?query=${title}${this._query}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error('Couldnt fetch!!');
    }
    const movies = await response.json();
    // eslint-disable-next-line arrow-body-style
    return movies.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path,
      };
    });
  }
}
