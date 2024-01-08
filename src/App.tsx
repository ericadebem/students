import { useEffect, useState } from "react";

interface IStudent {
  studentsFirstName: string;
  studentsLastName: string;
  studentsActive: boolean;
  age: number;
  _id: string;
}
function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentsFirstName: " ",
    studentsLastName: " ",
    studentsActive: false,
    age: 0,
  });
  const url = "http://localhost:5000/api/v1/students/";
  const handleSubmit = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setStudents(data.students);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  console.log(newStudent);
  return (
    <>
      <p>Teste 2 - Students</p>
      <ul>
        {students?.length > 0 &&
          students.map((student: IStudent) => (
            <li key={student._id}>{student.studentsFirstName}</li>
          ))}
      </ul>
      <form action="">
        <label htmlFor="">
          studentsFirstName:
          <input
            type="text"
            onChange={(e) =>
              setNewStudent({
                ...newStudent,
                studentsFirstName: e.target.value,
              })
            }
          />
        </label>
        <label htmlFor="">
          {" "}
          studentsLastName:
          <input
            type="text"
            onChange={(e) =>
              setNewStudent({ ...newStudent, studentsLastName: e.target.value })
            }
          />
        </label>
        <label htmlFor="">
          studentsActive:
          <input
            type="checkbox"
            onSelect={() =>
              setNewStudent({
                ...newStudent,
                studentsActive: !newStudent.studentsActive,
              })
            }
          />
        </label>
        <label htmlFor="">
          age:
          <input
            type="number"
            onChange={(e) =>
              setNewStudent({ ...newStudent, age: parseInt(e.target.value) })
            }
          />
        </label>
        <button onClick={handleSubmit}>Send</button>
      </form>
    </>
  );
}

export default App;
