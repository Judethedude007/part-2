import { useState, useEffect } from 'react';
import personService from './personService';

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    search: <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleAddPerson }) => (
  <form onSubmit={handleAddPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number} 
    <button onClick={() => handleDelete(person.id)}>delete</button>
  </li>
);

const Persons = ({ filteredPersons, handleDelete }) => (
  <ul>
    {filteredPersons.map(person => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch contacts. Make sure the backend is running.");
      });
  }, []);

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleAddPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            resetForm();
          })
          .catch(error => {
            console.error("Error updating person:", error);
            setErrorMessage("Failed to update person. Try again.");
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          resetForm();
        })
        .catch(error => {
          console.error("Error adding person:", error);
          setErrorMessage("Failed to add person. Try again.");
        });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.error("Error deleting person:", error);
          setErrorMessage("Failed to delete person. Try again.");
        });
    }
  };

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        handleAddPerson={handleAddPerson} 
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
