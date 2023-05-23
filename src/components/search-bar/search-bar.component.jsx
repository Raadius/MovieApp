import './search-bar.styles.scss';
const SearchBar = ({ placeholder, onSearchChange }) => {
  return (
    <div>
      <input className="search-bar" placeholder={placeholder} onChange={onSearchChange} />
    </div>
  );
};

export default SearchBar;
