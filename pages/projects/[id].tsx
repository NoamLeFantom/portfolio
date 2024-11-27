import { useRouter } from "next/router";
import projects from "../../data/projects.json";

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const project = projects[id as keyof typeof projects];

  if (!project) return <p>Projet introuvable.</p>;

  return (
    <div>
      <h1>{project.titre}</h1>
      <p>{project.description}</p>
      <ul>
        {project.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <div className="image-gallery">
        {project.images.map((src, index) => (
          <img key={index} src={src} alt={`${project.titre} ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
