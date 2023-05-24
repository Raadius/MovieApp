/* eslint-disable no-unused-vars */
import { apiKey } from './api-key';

export default class ApiService {
  async getResourceData(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}`) + `, received ${res.status}`;
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getMovies(request, page) {
    try {
      return await this.getResourceData(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${request}&page=${page}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPopularMovies(page) {
    try {
      return await this.getResourceData(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieGenres() {
    const res = await this.getResourceData(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    return res.genres;
  }
}
