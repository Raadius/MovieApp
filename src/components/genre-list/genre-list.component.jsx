import './genre.list.styles.scss';
const GenreList = ({ genres }) => {
  const genresBunchList = genres.map((genre) => {
    return (
      <div className="movie-card__content--wrapper__genres__item" key={genre.id}>
        {genre.name}
      </div>
    );
  });

  return <div className="movie-card__content--wrapper__genres">{genresBunchList}</div>;
};
export default GenreList;
