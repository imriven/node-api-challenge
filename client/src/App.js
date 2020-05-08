import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"


function App() {
const deleteProject = (e, projectId) => {
  e.preventDefault()
  axios
  .delete(`http://localhost:8000/api/projects/${projectId}`)
  .then(res => getProjects())
  //deletes and then update list
  .catch(err => console.log(err))
}

 const getProjects = () => {
  axios.get("http://localhost:8000/api/projects")
  .then(res => setProjects(res.data))
  .catch(err => console.log(err))
 }

const [projects, setProjects] = useState()

useEffect(() => {
  getProjects()
}, [])

const emptyForm = {
  name: "",
  description: "",
}

const [formState, setFormState] = useState(emptyForm);
  
const handleSubmit = (e) => {
  e.preventDefault();
  axios
  .post("http://localhost:8000/api/posts", formState)
  .then(res => getProjects())
  .catch(err => console.log(err))
  setFormState(emptyForm);
};

const handleChange = (e) => {
  e.persist();
  setFormState((previous) => ({
    ...previous,
    [e.target.name]: e.target.value,
  }));
};


  return (
    <div className="App">
      {projects && projects.map(project => <> <p>{project.name}</p> <p>{project.description}</p> <button onClick={e => deleteProject(e, project.id) }>Delete Project</button> </>)}
    <form>
    <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name of Project"
          />
        </label>
        <label htmlFor="description">
          <input
            id="description"
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Add Something"
          />
        </label>
      <button onClick={handleSubmit}>Add Project</button>
    </form>
    </div>
  );
}

export default App;
