const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ name, exercises}) => <p>{name} {exercises}</p>

const Content = ({ parts }) => (
    <div>
       {parts.map(part =>
      <Part
        key={part.name}
        name={part.name}
        exercises={part.exercises}
      />
    )}
    </div>
);
const Course = ({course}) => {
  return (
    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    </>
  )
}

export default Course