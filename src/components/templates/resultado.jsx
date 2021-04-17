import React, { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
const Resultado = (props) =>{
    return(
          <Fragment>
            <div className="resultado">
            <h1>Resultados</h1>
            <div className="musica">
                   
                            <div key={props.id}  className="inf-musica">
                                <div className="playImage">
                                <LazyLoad width={"100%"} debounce={false} offset={200}>
                                    <img src={props.album} alt=""/>

                                    <img className="playImg"  src={props.imgPlay} alt="" onClick={props.obtenerId} />
                                    </LazyLoad>
                                </div>
                                <h3  className="titulo">{props.titulo}</h3>
                                <p className="subtitulo">{props.artista}</p>
                            </div>
                                         
                </div>
            </div>
          </Fragment>
    )
}
export default Resultado