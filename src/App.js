/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import ApiService from './api-service/api-service';
import SearchBar from './components/search-bar/search-bar.component';
import MovieList from './components/movie-list/movie-list.component';
import LoadingSpinner from './components/loading-spinner/loading-spinner.component';
import ErrorMessage from './components/error-message/error-message.component';
import './App.scss';

const App = () => {
  const [filmsData, setFilmsData] = useState();
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [genres, setGenres] = useState([]);

  const movieApi = new ApiService();

  useEffect(() => {
    if (request.length === 0) {
      movieApi
        .getPopularMovies(page)
        .then((moviesData) => {
          setFilmsData(moviesData.results);
          setIsLoading(false);
          setTotal(moviesData.total_results);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          console.log(`Error caught while we were trying to fetch popular movies: ${error}`);
        });
    } else {
      movieApi
        .getMovies(request, page)
        .then((moviesData) => {
          setFilmsData(moviesData.results);
          setIsLoading(false);
          setTotal(moviesData.total_results);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          console.log(`Error caught while we were trying to fetch your request: ${error}`);
        });
    }
  }, [request, page, total, error]);

  useEffect(() => {
    movieApi.getMovieGenres().then((genres) => setGenres(genres));
  }, []);

  const onSearchChange = debounce((event) => {
    setIsLoading(true);
    setRequest(event.target.value);
  }, 500);

  const loadingStatus = isLoading ? <LoadingSpinner /> : null;
  const showMovies = !isLoading ? <MovieList filmsData={filmsData} genreList={genres} /> : null;
  const showError = total === 0 && !isLoading ? <ErrorMessage /> : null;

  return (
    <div>
      <SearchBar placeholder="Type here to search!" onSearchChange={onSearchChange} />
      {loadingStatus}
      {showMovies}
      {showError}
    </div>
  );
};

export default App;
