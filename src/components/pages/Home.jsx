import React, { Fragment } from 'react'
import BarraNavegacion from '../templates/barraNavegacion'

import Catalogo from '../templates/Catalogo'
const Home = () =>{
    return(
          <Fragment>
              <div className="contenedor">
               <div className="navegacion">
                 <BarraNavegacion/>
               </div>
                <div className="catalogo">
                  <Catalogo/>
                </div>
                
              </div>
          </Fragment>
    )
}
export default Home