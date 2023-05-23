import MovieItem from '../movie-item/movie-item.component';
import './movie-list.styles.scss';
const MovieList = (props) => {
  const movieBunchItems = props['filmsData'].map((item) => {
    const { id } = item;
    return <MovieItem key={id} item={item} />;
  });

  return <div className="movie-list-wrapper">{movieBunchItems}</div>;
};

export default MovieList;
