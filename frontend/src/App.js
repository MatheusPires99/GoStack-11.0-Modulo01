import React, { useState, useEffect } from "react";

import api from "./services/api"

import "./App.css"

import Header from "./components/Header"

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("projects");

      setProjects(response.data);
    }

    loadProjects();
  }, [])

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: "teste",
      owner: "teste"
    });

    setProjects([...projects, response.data])
  }

  return (
    <>
      <Header title="Matheus xD" />
      
      <ul>
        <li>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </li>
      </ul>

      <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App;