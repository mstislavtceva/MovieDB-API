export default class MovieService {
  constructor() {
    this._apiKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDVmYTY2YjViMzZlZGYxZThiYjFiYTNkMWZmZGQ4ZiIsInN1YiI6IjY2NDhlYzU0NWRlOTkyYjM5MDk1YmQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0JrmpG_r8AdNH8ye4CvmtobYsiiuyR1ZucXV6zVaUiU';

    this._apiUrl = 'https://api.themoviedb.org/3/search/movie';

    this._query = '&include_adult=false&language=en-US&page=';
  }

  // eslint-disable-next-line consistent-return
  async getMovies(title, page) {
    try {
      const response = await fetch(`${this._apiUrl}?query=${title}${this._query}${page}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Couldnt fetch!!');
      }

      if (response.status === 402) {
        throw new Error('VPN!');
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
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw err;
      }
      throw err;
    }
  }

  async getTotalPages(title, page) {
    try {
      const response = await fetch(`${this._apiUrl}?query=${title}${this._query}${page}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this._apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Couldnt fetch!!');
      }

      if (response.status === 402) {
        throw new Error('Something wrong');
      }

      const movies = await response.json();

      return movies.total_pages;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw err;
      }
      throw err;
    }
  }
}
