import React from "react";
import { render } from "react-dom";
import { observer } from "./mobx-react.js";
import { album } from "./store";

// In React
const Album = () => (
  <div>
    <h2>{album.title}</h2>
    <span>{album.playCount}</span>
  </div>
);

const ObserverAlbum = observer(Album);

render(<ObserverAlbum />, document.getElementById("root"));
