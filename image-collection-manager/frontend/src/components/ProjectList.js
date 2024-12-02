import React, { useState } from 'react';
import Project from './Project';

function ProjectList({ projects, addProject, removeProject, updateProjectImages, updateProjectDetails }) {
  const [newProject, setNewProject] = useState({ titre: '', description: '', details: [] });

  const handleAddProject = () => {
    addProject(newProject);
    setNewProject({ titre: '', description: '', details: [] });
  };

  return (
    <div className="container">
      <h2>Liste des Projets</h2>
      {Object.entries(projects).map(([id, project]) => (
        <Project
          key={id}
          id={id}
          project={project}
          removeProject={removeProject}
          updateProjectImages={updateProjectImages}
          updateProjectDetails={updateProjectDetails}
        />
      ))}
      <div>
        <h3>Ajouter un nouveau projet</h3>
        <input
          type="text"
          placeholder="Titre"
          className="input-field"
          value={newProject.titre}
          onChange={(e) => setNewProject({ ...newProject, titre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="input-field"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Détails (séparés par des virgules)"
          className="input-field"
          value={newProject.details.join(', ')}
          onChange={(e) => setNewProject({ ...newProject, details: e.target.value.split(', ') })}
        />
        <button className="button" onClick={handleAddProject}>Ajouter le projet</button>
      </div>
    </div>
  );
}

export default ProjectList;
