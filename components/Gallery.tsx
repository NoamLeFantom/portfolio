import { useState, useRef } from "react";
import Select from "react-select";

import styles from "../styles/Gallery.module.scss";
import projects from "../public/src/data/projects.json";

type ColorBackground = {
  BackgroundFill?: string;
};

const Gallery: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>([]);
  const tagOptions = [
    { value: "3D", label: "3D" },
    { value: "photo", label: "Photo" },
    { value: "vidéo", label: "Vidéo" },
    { value: "design", label: "Design" },
    { value: "modelling", label: "Modelling" },
    { value: "illustration", label: "Illustration" }
  ];

  const selectedTags = selectedOptions.map((opt) => opt.value);

  // Filtrage des projets en fonction du terme de recherche
  const filteredProjects = Object.entries(projects).filter(([key, project]) =>
    selectedTags.length === 0 ||
    project.details.some((detail: string) =>
      selectedTags.some(tag =>
        detail.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );



  const handleClick = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Réinitialise l'index à 0 lors de l'ouverture
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0); // Réinitialise l'index à 0 lors de la fermeture
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClosePopup();
    }
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    const currentProjectImages = selectedProject.images;
    if (currentImageIndex < currentProjectImages.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    } else {
      const projectKeys = Object.keys(projects) as Array<keyof typeof projects>;
      const currentProjectIndex = projectKeys.findIndex((key) => projects[key] === selectedProject);
      const nextProjectIndex = (currentProjectIndex + 1) % projectKeys.length;
      const nextProject = projects[projectKeys[nextProjectIndex]];
      setSelectedProject(nextProject);
      setCurrentImageIndex(0);
    }
  };

  const handlePreviousImage = () => {
    if (!selectedProject) return;
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    } else {
      const projectKeys = Object.keys(projects) as Array<keyof typeof projects>;
      const currentProjectIndex = projectKeys.findIndex((key) => projects[key] === selectedProject);
      const previousProjectIndex = (currentProjectIndex - 1 + projectKeys.length) % projectKeys.length;
      const previousProject = projects[projectKeys[previousProjectIndex]];
      setSelectedProject(previousProject);
      setCurrentImageIndex(previousProject.images.length - 1);
    }
  };

  // Fonction pour transformer le texte avec des liens
  const parseTextWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
    return text.replace(regex, (match, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    });
  };

  return (
    <div className={styles.galleryContainer} style={{ background: `${BackgroundFill}` }}>
      <div style={{ padding: `20px` }}>
        <p>Découvrez l'ensemble de mes projets</p>
        <p>Vous pouvez trier ces derniers par domaines (3D, photos, vidéos...)</p>
      </div>
      {/* Barre de recherche */}
      <div id='Projects' className={styles.searchBar}>
        <div className={styles.searchBar}>
          <label>Filtrer par domaines :</label>
          <Select
            options={tagOptions}
            isMulti
            value={selectedOptions}
            onChange={(selected) => setSelectedOptions(selected as { value: string; label: string }[])}
            placeholder="Choisissez un ou plusieurs domaines..."
          />
        </div>

      </div>

      {/* Affichage des projets filtrés */}
      <div className={styles.gallery}>
        {filteredProjects.map(([key, project]) => (
          <div key={key} className={styles.projectContainer}>
            <div className={styles.askToOpen}>
              <p>Voir les détails</p>
            </div>
            <div className={styles.projectCard} onClick={() => handleClick(project)}>
              <img src={'src' + project.images[0]} alt={project.titre} />
              <div className={styles.overlay}>
                <h3>{project.titre}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedProject && (
        <div className={styles.popup} onClick={handleOutsideClick}>
          <div className={styles.popupContent} ref={popupRef}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              X
            </button>
            <h3>{selectedProject.titre}</h3>
            <div className={styles.popupBody}>
              <img
                src={'src' + selectedProject.images[currentImageIndex]}
                alt={selectedProject.titre}
                className={
                  selectedProject.images[currentImageIndex].includes(".jpg")
                    ? styles.verticalImage
                    : styles.horizontalImage
                }
              />
              <div className={styles.popupDescription}>
                <p style={{ whiteSpace: `pre-wrap` }} className={styles.popupDescription} dangerouslySetInnerHTML={{ __html: parseTextWithLinks(selectedProject.description) }}></p>
                <div className={styles.detailsSection}>
                  <h4>Details</h4>
                  <div className={styles.detailsList}>
                    {selectedProject.details.map((detail: string, index: number) => (
                      <div key={index} className={styles.detailItem}>
                        <img
                          src={`src/ui/${detail}.svg`}
                          alt={detail}
                          className={styles.detailImage}
                        />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.prevButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
              >
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 21L8 11L13 1" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className={styles.nextButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
              >
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 21L13 11L8 1" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
