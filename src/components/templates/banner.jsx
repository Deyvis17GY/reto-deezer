import React, { Fragment } from 'react'
import imgBanner from '../../img/foxbel-music-icon@3x.png'
const Banner = () =>{
    return(
          <Fragment>
              <div className="banner">
                    <div className="disco">
                         <img src={imgBanner} alt=""/>
                    </div>
                    <div className="descripcion">
                     
                     
                      <div>
                          <h2>Adele 21</h2>
                          <p>Lo mejor de Adele</p>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, molestias?</p>
            
                      </div>
                  </div>
              </div>
          </Fragment>
    )
}
export default Banner