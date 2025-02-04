import PropTypes from 'prop-types';

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(function (sum, part) {
    console.log(`Adding ${part.exercises} exercises from ${part.name}`);
    return sum + part.exercises;
  }, 0);

  console.log(`Total exercises (excluding Redux): ${totalExercises}`);
  console.log(`Total exercises (including Redux): ${totalExercises + 11}`);

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
      <p>Total exercises: {totalExercises + 11}</p>
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

