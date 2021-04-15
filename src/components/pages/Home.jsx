import React, { Fragment,Suspense,lazy} from 'react'
import BarraNavegacion from '../templates/barraNavegacion'
import Cargando from '../templates/Cargando'
const Catalogo = lazy(()=> import('../templates/Catalogo'))

const Home = () =>{
    return(
          <Fragment>
              <div className="contenedor">
               <div className="navegacion">
                 <BarraNavegacion/>
               </div>
                <div className="catalogo">
                  <Suspense fallback={<Cargando/>}>
                  <Catalogo />
                  </Suspense>
                </div>
                
              </div>
          </Fragment>
    )
}
export default Home