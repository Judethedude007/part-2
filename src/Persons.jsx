import PropTypes from 'prop-types';

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
  );
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Persons;
