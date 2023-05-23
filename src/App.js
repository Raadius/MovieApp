/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import ApiService from './api-service/api-service';
import SearchBar from './components/search-bar/search-bar.component';
import MovieList from './components/movie-list/movie-list.component';
import LoadingSpinner from './components/loading-spinner/loading-spinner.component';
import ErrorMessage from './components/error-message/error-message.component';
import './App.scss';

const movieApi = new ApiService();

const App = () => {
  const [filmsData, setFilmsData] = useState();
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
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
        console.log('error caught');
        console.log(error);
      });
  }, [request, page, total, error]);

  const onSearchChange = debounce((event) => {
    setIsLoading(true);
    setRequest(event.target.value);
  }, 500);

  const loadingStatus = isLoading ? <LoadingSpinner /> : null;
  const showMovies = !isLoading ? <MovieList filmsData={filmsData} /> : null;
  const showError = total === 0 ? <ErrorMessage /> : null;

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
