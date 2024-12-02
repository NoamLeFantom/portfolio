import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import styled from 'styled-components';

const ModalContent = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

const Button = styled.button`
    margin: 10px 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;

function ProjectDetailsModal({ project, projectId, updateProject, removeProject, updateProjectImages, closeModal }) {
    const [editableProject, setEditableProject] = useState({ ...project });

    const handleUpdateProject = () => {
        updateProject(projectId, editableProject);
    };

    const handleRemoveProject = () => {
        removeProject(projectId);
        closeModal(); // Close modal after deletion
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProject({ ...editableProject, [name]: value });
    };

    const handleUpdateImages = (images) => {
        updateProjectImages(projectId, images);
    };

    return (
        <ModalContent>
            <h2>Détails du Projet</h2>
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
            <Button onClick={handleUpdateProject}>Mettre à jour le projet</Button>
            <Button onClick={handleRemoveProject}>Supprimer le projet</Button>
            <ImageUploader projectId={projectId} images={editableProject.images || []} onUpdateImages={handleUpdateImages} />
            <Button onClick={closeModal}>Fermer</Button>
        </ModalContent>
    );
}

export default ProjectDetailsModal;
