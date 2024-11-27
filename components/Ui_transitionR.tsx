import React from "react";
import styles from "../styles/Ui_transitionR.module.scss";


const Ui_transitionR = () => {
  return (
    <div className={styles.transition_ui}>
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L 1920 0 L 1920 100 L 0 200 Z" fill="#949494" />
      </svg>
    </div>
    );
};

export default Ui_transitionR;