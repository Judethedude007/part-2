import PropTypes from 'prop-types';

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  newName: PropTypes.string.isRequired,
  setNewName: PropTypes.func.isRequired,
  newNumber: PropTypes.string.isRequired,
  setNewNumber: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PersonForm;
