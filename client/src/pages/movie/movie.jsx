import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

import "@vime/core/themes/default.css";
import {
  Video,
  Player,
  DefaultUi,
  DefaultControls,
  Settings,
  MenuItem,
  Submenu,
  MenuRadio,
  MenuRadioGroup,
} from "@vime/react";

// import "./movie.scss";

export default function Movie() {
  const location = useLocation();
  const contentData = location.content;
  console.log("location", location);

  const [value, setValue] = useState("1");

  // const onMenuItem1Click = () => {
  //   console.log('Clicked menu item 1');
  // };

  const onCheck = (e) => {
    const radio = e.target.value;
    setValue(radio.value);
  };

  return (
    <div className="movie">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <Player>
        <video
          className="video"
          autoPlay
          progress
          controls
          src={contentData.video}
        />

        <DefaultUi noControls>
          <DefaultControls hideOnMouseLeave activeDuration={2000} />
        </DefaultUi>
      </Player>
    </div>
  );
}
