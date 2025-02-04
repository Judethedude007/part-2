import { useState, useEffect } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  useEffect(() => {
    console.log('New name state changed:', newName);
  }, [newName]);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        setPersons([...persons, { name: newName }]);
        setNewName('');
      }}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
      <div>Debug: {newName}</div>
    </div>
  );
}

export default App;