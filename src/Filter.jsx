import PropTypes from 'prop-types';

const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

Filter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Filter;
