import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import axios from 'axios';
import './index.css'; // Ajout du fichier CSS global

function App() {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  const addProject = (newProject) => {
    axios.post('http://localhost:5000/projects', newProject)
      .then(response => {
        const projectId = response.data;
        setProjects({ ...projects, [projectId]: { ...newProject, images: [] } });
      })
      .catch(error => console.error(error));
  };

  const removeProject = (projectId) => {
    axios.delete(`http://localhost:5000/projects/${projectId}`)
      .then(() => {
        const updatedProjects = { ...projects };
        delete updatedProjects[projectId];
        setProjects(updatedProjects);
      })
      .catch(error => console.error(error));
  };

  const updateProjectImages = (projectId, images) => {
    const updatedProjects = { ...projects };
    updatedProjects[projectId].images = images;
    setProjects(updatedProjects);
  };

  const updateProjectDetails = (projectId, updatedProject) => {
    axios.put(`http://localhost:5000/projects/${projectId}`, updatedProject)
      .then(() => {
        setProjects((prevProjects) => ({
          ...prevProjects,
          [projectId]: updatedProject
        }));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Gestion de la Collection d'Images</h1>
      <ProjectList 
        projects={projects} 
        addProject={addProject}
        removeProject={removeProject}
        updateProjectImages={updateProjectImages}
        updateProjectDetails={updateProjectDetails}
      />
    </div>
  );
}

export default App;
