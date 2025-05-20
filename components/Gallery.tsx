import { useState, useRef, useMemo, useCallback } from "react";
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
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const tagOptions = [
    { value: "3D", label: "3D" },
    { value: "photo", label: "Photo" },
    { value: "vidéo", label: "Vidéo" },
    { value: "design", label: "Design" },
    { value: "modelling", label: "Modelling" },
    { value: "illustration", label: "Illustration" }
  ];

  const selectedTags = selectedOptions.map((opt) => opt.value);

  // Fonction pour convertir une date au format "mois année" en objet Date
  const parseDate = useCallback((dateString: string) => {
    if (!dateString) return new Date(0); // Date par défaut si aucune date n'est fournie
    
    const months = {
      "janvier": 0, "février": 1, "mars": 2, "avril": 3, "mai": 4, "juin": 5,
      "juillet": 6, "août": 7, "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
    };
    
    const parts = dateString.split(' ');
    if (parts.length < 2) return new Date(0);
    
    const month = months[parts[0].toLowerCase() as keyof typeof months] || 0;
    const year = parseInt(parts[1]);
    
    return new Date(year, month);
  }, []);

  // Memoized filtered and sorted projects to improve performance
  const filteredProjects = useMemo(() => {
    // Filtrer d'abord par tags
    let filtered = Object.entries(projects).filter(([key, project]) =>
      selectedTags.length === 0 ||
      project.details.some((detail: string) =>
        selectedTags.some(tag =>
          detail.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
    
    // Trier par date
    filtered.sort(([keyA, projectA], [keyB, projectB]) => {
      const dateA = parseDate(projectA.date);
      const dateB = parseDate(projectB.date);
      
      return sortOrder === "newest" 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
    
    return filtered;
  }, [selectedTags, sortOrder, parseDate]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === "newest" ? "oldest" : "newest");
  }, []);

  const handleClick = useCallback((project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Réinitialise l'index à 0 lors de l'ouverture
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0); // Réinitialise l'index à 0 lors de la fermeture
  }, []);

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClosePopup();
    }
  }, [handleClosePopup]);

  const handleNextImage = useCallback(() => {
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
  }, [selectedProject, currentImageIndex]);

  const handlePreviousImage = useCallback(() => {
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
  }, [selectedProject, currentImageIndex]);

  // Fonction pour transformer le texte avec des liens
  const parseTextWithLinks = useCallback((text: string) => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
    return text.replace(regex, (match, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    });
  }, []);

  return (
    <div className={styles.galleryContainer} style={{ background: `${BackgroundFill}` }}>
      <div>
        <div style={{ padding: `20px` }}>
          <p>Découvrez l'ensemble de mes projets</p>
          <p>Vous pouvez trier ces derniers par domaines (3D, photos, vidéos...) et par date</p>
        </div>
        {/* Barre de recherche et tri */}
        <div id='Projects' className={styles.searchBar}>
          <div className={styles.searchBar}>
            <div style={{ marginBottom: '10px' }}>
              <label>Filtrer par domaines :</label>
              <Select
                options={tagOptions}
                isMulti
                value={selectedOptions}
                onChange={(selected) => setSelectedOptions(selected as { value: string; label: string }[])}
                placeholder="Choisissez un ou plusieurs domaines..."
              />
            </div>
            <div className={styles.sortControls}>
              <label>Tri par date :</label>
              <button 
                onClick={toggleSortOrder}
                className={styles.sortButton}
                title={sortOrder === "newest" ? "Du plus récent au plus ancien" : "Du plus ancien au plus récent"}
              >
                {sortOrder === "newest" ? (
                  <span>Plus récent d'abord <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg></span>
                ) : (
                  <span>Plus ancien d'abord <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14l5 5 5-5M7 10l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg></span>
                )}
              </button>
            </div>
          </div>
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
              <img src={'src' + project.images[0]} alt={project.titre} loading="lazy" />
              <div className={styles.overlay}>
                <h3>{project.titre}</h3>
                <p className={styles.projectDate}>{project.date}</p>
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
            <div style={{display:'flex', flexDirection:'row',columnGap: '20px'}}><h3>{selectedProject.titre}</h3>
            <h4>{selectedProject.date}</h4></div>
            <div className={styles.popupBody}>
              <img
                src={'src' + selectedProject.images[currentImageIndex]}
                alt={selectedProject.titre}
                className={
                  selectedProject.images[currentImageIndex].includes(".webp")
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
