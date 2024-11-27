import { useState } from "react";
import styles from "../styles/SearchBar.module.scss";

const SearchBar = ({ projects, onFilter }: { projects: any; onFilter: (filteredKeys: string[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filtrer selon les détails (tags)
    const filteredKeys = Object.keys(projects).filter((key) => {
      const project = projects[key];
      return project.details.some((detail: string) => detail.toLowerCase().includes(term));
    });

    onFilter(filteredKeys); // Renvoie les clés filtrées au parent
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search by tags (e.g., '3D', 'Modelling')..."
        value={searchTerm}
        onChange={handleSearch}/>
    </div>
  );
};

export default SearchBar;
