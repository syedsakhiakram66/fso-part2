const Persons = ({ persons }) => (
  <div>
    {persons.map((person, index) => (
      <p key={person?.id ?? person?.name ?? index}>
        {person?.name ?? '(no name)'} {person?.number ?? ''}
      </p>
    ))}
  </div>
)

export default Persons
