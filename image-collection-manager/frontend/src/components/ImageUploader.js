import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ projectId, images, onUpdateImages }) {
  const [newImage, setNewImage] = useState(null);

  const handleAddImage = () => {
    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('projectId', projectId);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      onUpdateImages([...images, response.data]);
      setNewImage(null);
    })
    .catch(error => console.error(error));
  };

  const handleRemoveImage = (index) => {
    const imagePath = images[index];
    axios.delete(`http://localhost:5000/projects/${projectId}/images`, {
      data: { imagePath }
    })
    .then(() => {
      const updatedImages = images.filter((_, i) => i !== index);
      onUpdateImages(updatedImages);
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h4>Images</h4>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index}>
            <img src={`http://localhost:5000${image}`} alt={`project-img-${index}`} />
            <button className="button button-danger" onClick={() => handleRemoveImage(index)}>Supprimer</button>
          </div>
        ))}
      </div>
      <input 
        type="file" 
        onChange={(e) => setNewImage(e.target.files[0])}
      />
      <button className="button" onClick={handleAddImage} disabled={!newImage}>Ajouter l'image</button>
    </div>
  );
}

export default ImageUploader;
