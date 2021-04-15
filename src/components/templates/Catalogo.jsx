import React, { Fragment, useEffect, useState } from 'react'
import imgCaricatura from '../../img/caricatura.png'
import buscar from '../../icons/buscar.svg'
import usuario from '../../icons/usuario.svg'
import Footer from '../templates/footer'
import axios from 'axios'
const Catalogo = () =>{
    const [nombre,setNombre] = useState('')
    const [cancion,setCancion] = useState([])
    const [artista,setArtista] = useState([])
    const [imgBanner,setImgBanner]=useState('')
    const [imgMiniatura,setImgMiniatura]= useState('')
    const [nomMusica,setNomMusica]=useState('')
    const [nomArtista,setNomArtista]=useState('')


    const getCancion = async (nom)=>{
        const response = await axios.get('https://api.deezer.com/search/track?q='+nom+'&index=0&limit=10&output=json')
        const datos = await response.data.data
        
        setArtista(datos)
        
    }

    const ObtenerDatos = (id)=>{ 
        console.log(id)
        console.log(id.preview)
        setCancion(id.preview)
        setImgBanner(id.album.cover_big)
        setImgMiniatura(id.album.cover)
        setNomMusica(id.title)
        setNomArtista(id.artist.name)
    }


           
    
    

    const buscarCancion = async()=>{
        if(nombre==='' || !nombre.trim() || nombre.length < 0){
            getCancion('bichota')
        }else{
            getCancion(nombre)
           
               
        }

    }
    const obtener = async ()=>{
        const data = await axios.get('https://api.deezer.com/search/track?q=bichota&index=0&limit=10&output=json')
        const personas = await data.data.data

        setArtista(personas)
        personas.map(item=>{
            setCancion(item.preview)
            setImgBanner(imgCaricatura)
            setNomMusica('Bichota')
            setNomArtista('Bichota')
            setImgMiniatura(imgCaricatura)
        })
        
    }
    useEffect( async()=>{
      await obtener()
      
    },[])
    return(
          <Fragment>
               <div className="busqueda">
                  <div className="buscar">
                      <input type="text" placeholder="Buscar" onChange={(e)=> setNombre(e.target.value)} onKeyUp={buscarCancion} />
                      <img src={buscar} alt=""/>
                  </div>
                  <div className="usuario">
                      <img src={usuario} alt=""/>
                      <p>Deyvis Mariños</p>
                  </div>
              </div>
              <div className="banner">
                    <div className="disco">
                    
                    <img src={imgBanner} alt=""/>
                    </div>
                    <div className="descripcion">
                          <h2>{nomMusica}</h2>
                          <p>{nomArtista}</p>
                          <p>Un mix infinito de favoritos y de canciones nuevas</p>
                  </div>
              </div>
              <div className="resultado">
                   <h1>Resultados</h1>
                   <div className="musica">
                         {
                            artista.map( (item)=>(

                                <div key={item.id}  className="inf-musica">
                                <img onClick={(e)=>ObtenerDatos(item)} src={item.album.cover_big} alt=""/>
                                <h3  className="titulo">{item.title}</h3>
                                <p className="subtitulo">{item.artist.name}</p>
                                </div>
                            ))
                        }
                       
                        
                    </div>
                </div>
                <Footer musica={cancion} caricatura={imgMiniatura} nombreCancion={nomMusica} nomArtista={nomArtista} />
          </Fragment>
    )
}
export default Catalogo