import React, { Fragment, useEffect, useState } from 'react'
import imgCaricatura from '../../img/caricatura.png'
import buscar from '../../icons/buscar.svg'
import usuario from '../../icons/usuario.svg'
import Footer from '../templates/footer'
import fetchJsonp from 'fetch-jsonp'
import playImg from '../../icons/playImage.svg'
import pausaImg from '../../img/pausa.png'
const Catalogo = () =>{
    const [nombre,setNombre] = useState('')
    const [cancion,setCancion] = useState([])
    const [artista,setArtista] = useState([])
    const [imgBanner,setImgBanner]=useState('')
    const [imgMiniatura,setImgMiniatura]= useState('')
    const [nomMusica,setNomMusica]=useState('')
    const [nomArtista,setNomArtista]=useState('')
    const inicioImg = document.querySelector('.inicioImg')
    let contador = 1
    let valor = false

    const reproducir = ()=>{
        if(contador==1){
            contador =0
            inicioImg.play()
            valor = true
            
        }else{
            contador =1
            inicioImg.pause()
            valor= false
        }   
        console.log(valor)
    }

    const getCancion = async (nom)=>{
        const response = await fetchJsonp('https://api.deezer.com/search/track?q='+nom+'&index=0&limit=10&output=jsonp')
        const respuesta = await response.json()
        const datos = respuesta.data
        setArtista(datos)   
    }

    
    const ObtenerDatosId = (id)=>{ 
        setCancion(id.preview)
        setImgBanner(id.album.cover_big)
        setImgMiniatura(id.album.cover)
        setNomMusica(id.title)
        setNomArtista(id.artist.name)
        reproducir()
    }

    const buscarCancion = async()=>{
        if(nombre==='' || !nombre.trim() || nombre.length < 0){
            getCancion('bichota')
        }else{
            getCancion(nombre)
  
        }
    }

    const obtener = async ()=>{
        const data = await fetchJsonp('https://api.deezer.com/search/track?q=bichota&index=0&limit=10&output=jsonp')
        const response = await data.json()
        const personas = response.data

        setArtista(personas)
        personas.map(item=>{
            setCancion(item.preview)
            setImgBanner(imgCaricatura)
            setNomMusica('Bichota')
            setNomArtista('Bichota')
            setImgMiniatura(imgCaricatura)
        })
        
    }

    useEffect(()=>{
      obtener()
      
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
                                    <div className="playImage">
                                        <img src={item.album.cover_big} alt=""/>
                                    {
                                        valor = true ? 
                                        <img className="playImg"  src={playImg} alt="" onClick={(e)=>ObtenerDatosId(item)} />
                                        : 
                                        <img className="playImg"  src={pausaImg} alt="" onClick={(e)=>ObtenerDatosId(item)} />
                                     }
                                    </div>
                                    <h3  className="titulo">{item.title}</h3>
                                    <p className="subtitulo">{item.artist.name}</p>
                                </div>
                            ))
                        }
                       
                        
                    </div>
                </div>
                <Footer musica={cancion} caricatura={imgMiniatura} nombreCancion={nomMusica} nomArtista={nomArtista} inicioImg="inicioImg" />
          </Fragment>
    )
}
export default Catalogo