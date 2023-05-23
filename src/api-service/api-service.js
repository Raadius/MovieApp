/* eslint-disable no-unused-vars */
import axios from 'axios';

import { apiKey } from './api-key';

export default class ApiService {
  async getResourceData(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`) + `, received ${res.status}`;
    }
    return await res.json();
  }

  async getMovies(request, page) {
    const res = await this.getResourceData(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${request}&page=${page}`
    );
    return res.results;
  }
}
