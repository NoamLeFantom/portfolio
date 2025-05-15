import { useState, useEffect, useCallback, useRef } from "react";
import classNames from "classnames";
import styles from "../styles/Header.module.scss";

type ColorBackground = {
  BackgroundFill?: string;
};

const Header: React.FC<ColorBackground> = ({ BackgroundFill }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollState, setScrollState] = useState({ isVisible: true, lastY: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => {
    if (isMobile) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollState((prev) => {
        const currentY = window.scrollY;
        const isVisible = currentY < prev.lastY || currentY < 50;
        
        // Close menus when scrolling down
        if (!isVisible) {
          setIsOpen(false);
          setIsDropdownOpen(false);
        }
        
        return {
          isVisible,
          lastY: currentY,
        };
      });
    });
  }, []);  

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle clicks outside the dropdown to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  return (
    <header
      className={classNames(styles.header, {
        [styles.visible]: scrollState.isVisible,
        [styles.hidden]: !scrollState.isVisible,
      })}
      style={{ background: BackgroundFill }}
    >
      <div className={styles.container}>
        <a href="/" className={styles.logoLink}>
          <img src="/src/ui/logo-letter.png" alt="Logo du site" className={styles.logo} />
        </a>
        
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
          {isOpen ? (
            <svg width="25" height="27" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.25" y1="-1.25" x2="32.8092" y2="-1.25"
                transform="matrix(0.679134 -0.734015 0.679134 0.734015 1.86914 27)"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="1.25" y1="-1.25" x2="32.8092" y2="-1.25"
                transform="matrix(0.679134 0.734015 -0.679134 0.734015 0 2)"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="31" height="23" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.0312 11.5C30.0312 10.7233 29.4016 10.0938 28.625 10.0938H2.375C1.59835 10.0938 0.96875 10.7233 0.96875 11.5C0.96875 12.2767 1.59835 12.9062 2.375 12.9062H28.625C29.4016 12.9062 30.0312 12.2767 30.0312 11.5Z"
                fill="white"
              />
              <path
                d="M30.0312 2.125C30.0312 1.34835 29.4016 0.71875 28.625 0.71875H2.375C1.59835 0.71875 0.96875 1.34835 0.96875 2.125C0.96875 2.90165 1.59835 3.53125 2.375 3.53125H28.625C29.4016 3.53125 30.0312 2.90165 30.0312 2.125Z"
                fill="white"
              />
              <path
                d="M30.0312 20.875C30.0312 20.0983 29.4016 19.4688 28.625 19.4688H2.375C1.59835 19.4688 0.96875 20.0983 0.96875 20.875C0.96875 21.6517 1.59835 22.2812 2.375 22.2812H28.625C29.4016 22.2812 30.0312 21.6517 30.0312 20.875Z"
                fill="white"
              />
            </svg>
          )}
        </button>

        <nav className={classNames(styles.menu, { [styles.menuOpen]: isOpen })} style={{ background: BackgroundFill }}>
          <ul className={styles.menuList}>
            <li className={styles.link}><a href="/">Accueil</a></li>
            <li className={styles.link}><a href="/GaleriePage">Galerie</a></li>
            <li className={styles.link}><a href="/ContactPage">Contact</a></li>
            <li className={styles.link}>
              <div 
                ref={dropdownRef}
                className={classNames(styles.dropdown, {
                  [styles.dropdownActive]: isDropdownOpen
                })}
              >
                <span 
                  className={styles.dropbtn} 
                  onClick={toggleDropdown}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  Projets intéracifs
                  {isMobile && (
                    <span className={styles.dropdownArrow}>
                      {isDropdownOpen ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </span>
                <div 
                  className={classNames(styles.dropdown_content, {
                    [styles.dropdownOpen]: isMobile && isDropdownOpen
                  })}
                >
                  <a href="/SkillsPage">Cartographie de Compétences</a>
                  <a href="/CablesGLPage">Projets Cables.GL</a>
                  <a href="#">Link 3</a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
