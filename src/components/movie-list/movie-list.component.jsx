/* eslint-disable no-unused-vars */
import MovieItem from '../movie-item/movie-item.component';
import './movie-list.styles.scss';
const MovieList = ({ filmsData, genreList }) => {
  function getGenres(ids) {
    const genreArr = [];
    ids.forEach((id) => {
      const genre = genreList.find((genre) => genre.id === id);
      genreArr.push({ id: genre.id, name: genre.name });
    });
    return genreArr;
  }

  const myArr = [];
  filmsData.forEach((item) => {
    const listItem = {
      id: item.id,
      title: item.title,
      release_date: item.release_date,
      poster: item.poster_path,
      description: item.overview,
      genres: getGenres(item.genre_ids),
      votes: item.vote_average,
      rating: item.popularity,
    };
    myArr.push(listItem);
  });

  const movieBunchItems = myArr.map((item) => {
    const { id } = item;
    return <MovieItem key={id} item={item} />;
  });

  return <div className="movie-list-wrapper">{movieBunchItems}</div>;
};

export default MovieList;
