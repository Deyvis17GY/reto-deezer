import React, { Fragment } from 'react'
import imgBanner from '../../img/foxbel-music-icon@3x.png'
const Resultado = () =>{
    return(
          <Fragment>
              <div className="resultado">
                   <h1>Resultados</h1>
                   <div className="musica">
                        <div className="inf-musica">
                            <img src={imgBanner} alt=""/>
                            <h3 className="titulo">The Feir</h3>
                            <p className="subtitulo">Lyly Again</p>
                        </div>
                    
                    </div>
                  
                </div>
          </Fragment>
    )
}
export default Resultado