import MovieItem from '../movie-item/movie-item.component';
import './movie-list.styles.scss';
const MovieList = (props) => {
  const myArr = [];
  props['filmsData'].forEach((item) => {
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
    myArr.push(listItem);
  });

  const movieBunchItems = myArr.map((item) => {
    const { id } = item;
    return <MovieItem key={id} item={item} />;
  });

  return <div className="movie-list-wrapper">{movieBunchItems}</div>;
};

export default MovieList;
