import React, { Fragment } from 'react'
import LazyLoad from 'react-lazyload'

const MusicaRow = ({item}) =>{
    
    return(
          <Fragment>
             <div className="resultado">
            <h1>Resultados</h1>
                <div className="musica">
                    <div className="inf-musica">
                        <div className="playImage">
                        <LazyLoad width={"100%"} debounce={false} offset={200}>
                            <img src={item.album.cover_big} alt={item.name}/>
                            <img className="playImg"  src={playImg} alt="" onClick={(e)=>ObtenerDatosId(item)} />
                            </LazyLoad>
                        </div>
                        <h3  className="titulo">{item.title}</h3>
                        <p className="subtitulo">{item.artist.name}</p>
                    </div>
                                
                </div>
            </div>
          </Fragment>
    )
}
export default MusicaRow