import { useState, useEffect } from 'react';
import personService from './personService';
import Notification from './Notification';

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
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        console.error("Error fetching data:", error);
        setNotification({ message: "Failed to fetch contacts. Make sure the backend is running.", type: 'error' });
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
            setNotification({ message: `Updated ${newName}'s number`, type: 'success' });
            setTimeout(() => setNotification({ message: null, type: '' }), 5000);
          })
          .catch(error => {
            console.error("Error updating person:", error);
            setNotification({ message: "Failed to update person. Try again.", type: 'error' });
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          resetForm();
          setNotification({ message: `Added ${newName}`, type: 'success' });
          setTimeout(() => setNotification({ message: null, type: '' }), 5000);
        })
        .catch(error => {
          console.error("Error adding person:", error);
          setNotification({ message: "Failed to add person. Try again.", type: 'error' });
        });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification({ message: `Deleted ${person.name}`, type: 'success' });
          setTimeout(() => setNotification({ message: null, type: '' }), 5000);
        })
        .catch(error => {
          console.error("Error deleting person:", error);
          setNotification({ message: "Failed to delete person. Try again.", type: 'error' });
        });
    }
  };

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
