import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

function Project({ id, project, removeProject, updateProjectImages, updateProjectDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });

  const handleRemoveProject = () => {
    removeProject(id);
  };

  const handleUpdateImages = (images) => {
    updateProjectImages(id, images);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProjectDetails(id, editedProject);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <div className="project-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="titre"
            className="input-field"
            value={editedProject.titre}
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="input-field"
            value={editedProject.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="details"
            className="input-field"
            value={editedProject.details.join(', ')}
            onChange={(e) => handleChange({ target: { name: 'details', value: e.target.value.split(', ') } })}
          />
          <button className="button" onClick={handleSave}>Enregistrer</button>
        </div>
      ) : (
        <div>
          <h3>{project.titre}</h3>
          <p>{project.description}</p>
          <p>Détails: {project.details.join(', ')}</p>
          <button className="button button-secondary" onClick={handleEdit}>Éditer</button>
        </div>
      )}
      <ImageUploader projectId={id} images={project.images || []} onUpdateImages={handleUpdateImages} />
      <button className="button button-danger" onClick={handleRemoveProject}>Supprimer le projet</button>
    </div>
  );
}

export default Project;
