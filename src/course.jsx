import PropTypes from 'prop-types';

const Course = ({ course }) => {
  const filteredParts = course.parts.filter(part => part.name !== 'Redux');

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {filteredParts.map(part => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Course;

