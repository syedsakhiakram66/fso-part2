import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function addName(event) {
    event.preventDefault();
    
      const name = newName.trim();

      if (!name) return;
      const exists = persons.some(
        person => person.name.toLowerCase() == name.toLowerCase()
      )

      if (exists) {
        alert(`${name} is already added to phonebook`);
        return;
      }

      setPersons([...persons, { name }]);
      setNewName("");
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
