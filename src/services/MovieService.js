export default class MovieService {
  constructor() {
    // this._apiKey =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDVmYTY2YjViMzZlZGYxZThiYjFiYTNkMWZmZGQ4ZiIsInN1YiI6IjY2NDhlYzU0NWRlOTkyYjM5MDk1YmQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0JrmpG_r8AdNH8ye4CvmtobYsiiuyR1ZucXV6zVaUiU';

    this._apiKey = 'dd5fa66b5b36edf1e8bb1ba3d1ffdd8f';

    this._apiBaseUrl = 'https://api.themoviedb.org/3/';
  }

  // eslint-disable-next-line consistent-return
  async getMovies(title, page) {
    try {
      const url = `${this._apiBaseUrl}search/movie?query=${title}&api_key=${this._apiKey}&include_adult=false&language=en-US&page=${page}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Couldnt fetch movies!!');
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
          rate: 0,
          vote: movie.vote_average.toFixed(1),
          genres: movie.genre_ids,
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
      const url = `${this._apiBaseUrl}search/movie?query=${title}&api_key=${this._apiKey}&include_adult=false&language=en-US&page=${page}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Couldnt fetch total pages!!');
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

  async getGuestSession() {
    try {
      const url = `${this._apiBaseUrl}authentication/guest_session/new?api_key=${this._apiKey}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Couldnt get guest session!!');
      }
      if (response.status === 402) {
        throw new Error('402 error');
      }

      const guestResponse = await response.json();
      return guestResponse.guest_session_id;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw err;
      }
      throw err;
    }
  }

  async addRating(idMovie, body, sessionId) {
    try {
      const url = `${this._apiBaseUrl}movie/${idMovie}/rating?guest_session_id=${sessionId}&api_key=${this._apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Couldnt add rating!!');
      }
      if (response.status === 402) {
        throw new Error('402 error');
      }
      return response;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw err;
      }
      throw err;
    }
  }

  async getGenres() {
    try {
      const url = `${this._apiBaseUrl}genre/movie/list?api_key=${this._apiKey}&language=en`;

      const response = await fetch(url, {
        method: 'GET',
        accept: 'application/json',
      });

      if (!response.ok) {
        throw new Error('Couldnt get rating!!');
      }
      if (response.status === 402) {
        throw new Error('402 error');
      }

      const genresList = await response.json();

      return genresList.genres;
    } catch (err) {
      if (err.message === 'Failed to fetch genres') {
        throw err;
      }
      throw err;
    }
  }

  async getRating(sessionId) {
    try {
      const url = `${this._apiBaseUrl}guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=1&sort_by=created_at.asc`;

      const response = await fetch(url, {
        method: 'GET',
        accept: 'application/json',
      });

      if (!response.ok) {
        throw new Error('Couldnt get rating!!');
      }
      if (response.status === 402) {
        throw new Error('402 error');
      }

      const ratedMovies = await response.json();

      // eslint-disable-next-line arrow-body-style
      return ratedMovies;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw err;
      }
      throw err;
    }
  }
}
