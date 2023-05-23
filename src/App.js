/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import ApiService from './api-service/api-service';
import SearchBar from './components/search-bar/search-bar.component';
import MovieList from './components/movie-list/movie-list.component';

import './App.scss';

const movieApi = new ApiService();
const App = () => {
  const [filmsData, setFilmsData] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
    movieApi.getMovies(request, page).then((data) => {
      const arr = [];
      data.forEach((item) => {
        const listItem = {
          id: item.id,
          title: item.title,
          release_date: item.release_date,
          poster: item.poster_path,
          description: item.overview,
          genres: item.genre_ids,
          votes: item.vote_average,
          rating: item.popularity,
        };
        arr.push(listItem);
        setFilmsData(arr);
      });
    });
  }, [request, page]);

  const onSearchChange = (event) => {
    setRequest(event.target.value);
  };

  return (
    <div>
      <SearchBar placeholder="Type here to search!" onSearchChange={onSearchChange} />
      <MovieList filmsData={filmsData} />
    </div>
  );
};

export default App;
