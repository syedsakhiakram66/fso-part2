const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addNameAndNumber }) => (
  <form onSubmit={addNameAndNumber}>
    <h2>add a new</h2>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      <br />
      number: <input value={newNumber} onChange={handleNumberChange} required />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
