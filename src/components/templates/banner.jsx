import React, { Fragment } from "react";

const Banner = (props) => {
  return (
    <Fragment>
      <div className="banner">
        <div className="disco">
          <img src={props.banner} alt="" />
        </div>
        <div className="descripcion">
          <h2>{props.musica}</h2>
          <p>{props.artista}</p>
          <p>
            Prueba Flow, sólo en Deezer. Escucha tu música, cuando sea y dónde
            sea
          </p>
          <div className="button">
            <button className="reproduce" onClick={props.reproduce}>
              Reproducir
            </button>
            <button className="seguir">Seguir</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Banner;
