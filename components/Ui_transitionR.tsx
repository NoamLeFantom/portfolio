import React from "react";
import styles from "../styles/Ui_transitionR.module.scss";

type TransitionProps = {
  className?: string;
};

const Ui_transitionR: React.FC<TransitionProps> = ({ className }) => {
  return (
    <div className={`${styles.transition_ui}`}>
      <svg className={`${className}`} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L 1920 0 L 1920 100 L 0 200 Z" fill="#eaeaea" />
      </svg>
    </div>
    );
};

export default Ui_transitionR;