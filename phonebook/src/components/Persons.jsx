import personService from './services/persons';

const Persons = ({ persons, setPersons }) => {

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (!confirmDelete) return;
    personService
      .deletes(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(err => {
        console.error('Delete failed', err);
        alert(`Information of ${name} has already been removed from server`);
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  return (
    <div>
      {persons.map((person, index) => (
        <div key={person?.id ?? person?.name ?? index} style={{ marginBottom: '10px' }}>
          <span>
            {person?.name ?? '(no name)'} {person?.number ?? ''}
          </span>
          <button 
            onClick={() => handleDelete(person.id, person.name)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Persons;