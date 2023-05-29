/* eslint-disable no-unused-vars */
import axios from 'axios';

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
    try {
      const res = await this.getResourceData(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      return res.genres;
    } catch (error) {
      console.log(error);
    }
  }

  async createGuestSession() {
    try {
      const res = await this.getResourceData(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
      );
      return res.guest_session_id;
    } catch (error) {
      console.log(error);
    }
  }

  async setMovieRating(id, rating, sessionId) {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    const requestBody = {
      value: rating,
    };
    return await axios.post(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=7d0349337e7da854b0da94f99185e198&guest_session_id=${sessionId}`,
      requestBody,
      { headers }
    );
  }

  async getRatedMovies(sessionId, page) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=7d0349337e7da854b0da94f99185e198&language=en-US&sort_by=created_at.asc&page=${page}`
    );

    return response.data;
  }
}
