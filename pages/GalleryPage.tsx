import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Ui_transitionR from "../components/Ui_transitionR";

const SkillsPage = () => {

  return (
    <div className={"GlobalPage"}>
      <Header BackgroundFill={"#EA5930"} />
      <Ui_transitionR className={"Left"} BackgroundShapeFill={"#EA5930"} BackgroundFill={"#EFEFEF"} />
      <Gallery BackgroundFill={"#efefef"} />
    </div>
  );
};

export default SkillsPage;
