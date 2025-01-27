import React from "react";
import styles from "../styles/Ui_transitionR.module.scss";

type TransitionProps = {
  className?: string;
  BackgroundShapeFill?:string;
  BackgroundFill?:string;
};

const Ui_transitionR: React.FC<TransitionProps> = ({ className, BackgroundShapeFill, BackgroundFill }) => {
  return (
    <div className={`${styles.transition_ui} ${className}`} style={{ backgroundColor: `${BackgroundFill}`}}>
      <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 0 L 1920 0 L 1920 100 L 0 200 Z" fill={`${BackgroundShapeFill}`} />
      </svg>
    </div>
    );
};
export default Ui_transitionR;