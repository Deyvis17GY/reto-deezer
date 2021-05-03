import React, { Fragment } from 'react'
import buscar from '../../icons/buscar.svg'
import usuario from '../../icons/usuario.svg'
const Buscar = (props) =>{

    
    return(
          <Fragment>
               <div className="busqueda">
                <div className={`buscar ${props.search_input}`}>
                    <input type="search" placeholder="Buscar"
                     onChange={props.escribe} onKeyUp={props.cancion} autoFocus />
                    <img src={buscar} alt=""/>
                        <div className={`autocom-box ${props.pintarBuscar}`}>
                            {props.user}
                        </div>
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