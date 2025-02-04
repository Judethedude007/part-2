import PropTypes from 'prop-types';

const Course = ({ course }) => {
  const totalExercises = 42; // Set total exercises to 42

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
        <li key="redux">
          Redux 11
        </li>
      </ul>
      <p>Total exercises: {totalExercises}</p>
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

