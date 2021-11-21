import React, { Fragment } from "react";
import foxbel from "../../img/foxbel-music.png";
const BarraNavegacion = () => {
  return (
    <Fragment>
      <div className="top">
        <div className="logo">
          <img src={foxbel} alt="" />
        </div>

        <div className="libreria">
          <h1>Mi Libreria</h1>
          <ul>
            <li>Recientes</li>
            <li>Artistas</li>
            <li>Albums</li>
            <li>Canciones</li>
            <li>Estaciones</li>
          </ul>
        </div>
        <div className="playlist">
          <h1>Playlist</h1>
          <ul>
            <li>Metal</li>
            <li>Para Bailar</li>
            <li>Rock 90s</li>
            <li>Baladas</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default BarraNavegacion;
