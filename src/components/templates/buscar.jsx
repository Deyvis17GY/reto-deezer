import React, { Fragment } from 'react'
import buscar from '../../icons/buscar.svg'
import usuario from '../../icons/usuario.svg'
const Buscar = (props) =>{
    return(
          <Fragment>
               <div className="busqueda">
                <div className="buscar">
                    <input type="text" placeholder="Buscar" onChange={props.escribe} onKeyUp={props.cancion} autoFocus />
                    <img src={buscar} alt=""/>
                </div>
                <div className="usuario">
                    <img src={usuario} alt=""/>
                    <p>Deyvis Mariños</p>
                </div>
            </div>
          </Fragment>
    )
}
export default Buscar