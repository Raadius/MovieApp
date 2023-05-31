/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Pagination, Alert, Tabs } from 'antd';

import ApiService from './api-service/api-service';
import SearchBar from './components/search-bar/search-bar.component';
import MovieList from './components/movie-list/movie-list.component';
import LoadingSpinner from './components/loading-spinner/loading-spinner.component';
import NotFoundMessage from './components/error-message/notfound-message.component';
import './App.scss';

const App = () => {
  const [filmsData, setFilmsData] = useState();
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState();
  const [genres, setGenres] = useState([]);
  const [guestSessionId, setGuestSessionId] = useState('');
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratedMoviesPage, setRatedMoviesPage] = useState(1);
  const [ratedMoviesTotal, setRatedMoviesTotal] = useState([]);

  const movieApi = new ApiService();
  const localStorageSessionId = localStorage.getItem('guestSessionId');

  useEffect(() => {
    movieApi.createGuestSession().then((guestSessionId) => {
      setGuestSessionId(guestSessionId);
      if (localStorage.getItem('guestSessionId') === null) {
        localStorage.setItem('guestSessionId', guestSessionId);
      }
    });
  }, []);

  useEffect(() => {
    if (request.length === 0) {
      movieApi
        .getPopularMovies(page)
        .then((moviesData) => {
          setFilmsData(moviesData.results);
          setIsLoading(false);
          if (moviesData.total_pages > 10000) {
            setTotal(10000);
            window.scrollTo(0, 0);
          } else {
            setTotal(moviesData.total_pages);
          }
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
          window.scrollTo(0, 0);
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

  const onPageChange = (page) => {
    setPage(page);
  };

  const setMovieRating = (movieId, rating) => {
    if (rating === 0) {
      movieApi.deleteMovieRating(movieId, localStorageSessionId).catch((err) => {
        console.log('Error occurred when we were trying to delete movie rating: ', err);
      });
      const newRatedMovies = ratedMovies.filter((movie) => movie.id !== movieId);
      setRatedMovies(newRatedMovies);
    } else {
      movieApi.setMovieRating(movieId, rating, localStorageSessionId).catch((err) => {
        console.log('Error occurred when we were trying to set movie rating: ', err);
      });
    }

    if (localStorage.getItem('movieRating') === null) {
      const obj = {};
      obj[movieId] = rating;
      localStorage.setItem('movieRating', JSON.stringify(obj));
    } else {
      const obj = JSON.parse(localStorage.getItem('movieRating'));
      obj[movieId] = rating;
      localStorage.setItem('movieRating', JSON.stringify(obj));
    }
  };

  const loadingStatus = isLoading ? <LoadingSpinner /> : null;
  const showMovies =
    !isLoading && !error ? (
      <MovieList filmsData={filmsData} genreList={genres} setMovieRating={setMovieRating} />
    ) : null;
  const showPopularMovies =
    !isLoading && !error ? (
      <MovieList filmsData={ratedMovies} genreList={genres} setMovieRating={setMovieRating} />
    ) : null;
  const notFoundMessage = total === 0 && !isLoading && !error ? <NotFoundMessage /> : null;
  const showPagination =
    !isLoading && total > 0 && !error ? (
      <Pagination
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        total={total}
        onChange={onPageChange}
        hideOnSinglePage={true}
      />
    ) : null;
  const showRatedPagination =
    !isLoading && total > 0 && !error ? (
      <Pagination
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        total={ratedMoviesTotal}
        onChange={onPageChange}
        hideOnSinglePage={true}
      />
    ) : null;
  const fetchError =
    error && !isLoading ? (
      <Alert
        message="Server Error"
        description="Something went wrong... Please check your internet connection and try again later"
        type="error"
      />
    ) : null;
  const noRatedMovies =
    ratedMovies.length === 0 && !isLoading && !error ? (
      <Alert
        message="No rated movies yet!"
        description="Rate a movie first and it will be available for you here!"
        type="warning"
        style={{ marginTop: '20px', width: '70%', margin: '0 auto', textAlign: 'center' }}
      />
    ) : null;
  const showWhatWeHave = ratedMovies.length > 0 && !isLoading && !error ? showPopularMovies : noRatedMovies;
  const changeTabs = (value) => {
    if (value === '2') {
      movieApi
        .getRatedMovies(localStorageSessionId, ratedMoviesPage)
        .then((moviesData) => {
          setRatedMovies(moviesData.results);
          setIsLoading(false);
          setRatedMoviesTotal(moviesData.total_results);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
          console.log(`Error caught while we were trying to fetch your rated movies: ${error}`);
        });
    }
  };

  const items = [
    {
      label: 'Search',
      key: '1',
      children: (
        <>
          <SearchBar placeholder="Type here to search!" onSearchChange={onSearchChange} />
          {loadingStatus}
          {fetchError}
          {showMovies}
          {notFoundMessage}
          <div className="pagination-wrapper">
            <div className="pagination-wrapper__item">{showPagination}</div>
          </div>
        </>
      ),
    },
    {
      label: 'Rated',
      key: '2',
      children: (
        <>
          {loadingStatus}
          {fetchError}
          {showWhatWeHave}
          {notFoundMessage}
          <div className="pagination-wrapper">
            <div className="pagination-wrapper__item">{showRatedPagination}</div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <div className="tabs-header">
        <Tabs centered defaultActiveKey="1" items={items} onTabClick={changeTabs} />
      </div>
    </div>
  );
};

export default App;
