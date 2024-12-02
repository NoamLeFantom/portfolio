import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import styled from 'styled-components';

const DetailsContainer = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
`;

const TextArea = styled.textarea`
    display: block;
    margin: 10px 0;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
`;

function ProjectDetails({ project, projectId, updateProject, removeProject, updateProjectImages }) {
    const [editableProject, setEditableProject] = useState({ ...project });

    const handleUpdateProject = () => {
        updateProject(projectId, editableProject);
    };

    const handleRemoveProject = () => {
        removeProject(projectId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProject({ ...editableProject, [name]: value });
    };

    const handleUpdateImages = (images) => {
        updateProjectImages(projectId, images);
    };

    return (
        <DetailsContainer>
            <h3>Détails du Projet</h3>
            <Input 
                type="text" 
                name="titre" 
                value={editableProject.titre} 
                onChange={handleInputChange} 
                placeholder="Titre"
            />
            <TextArea 
                name="description" 
                value={editableProject.description} 
                onChange={handleInputChange} 
                placeholder="Description"
            />
            <button onClick={handleUpdateProject}>Mettre à jour le projet</button>
            <button onClick={handleRemoveProject}>Supprimer le projet</button>
            <ImageUploader projectId={projectId} images={editableProject.images || []} onUpdateImages={handleUpdateImages} />
        </DetailsContainer>
    );
}

export default ProjectDetails;
