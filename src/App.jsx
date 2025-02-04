import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons') // Change the port to 3002
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PersonForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
        handleSubmit={handleSubmit} 
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
      <div>Debug: {newName} {newNumber}</div>
    </div>
  );
}

export default App;