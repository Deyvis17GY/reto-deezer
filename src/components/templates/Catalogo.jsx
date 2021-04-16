import React, { Fragment, useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import imgCaricatura from '../../img/caricatura.png'
import buscar from '../../icons/buscar.svg'
import usuario from '../../icons/usuario.svg'
import Footer from '../templates/footer'
import fetchJsonp from 'fetch-jsonp'
import playImg from '../../icons/playImage.svg'

const Catalogo = () =>{
    const [nombre,setNombre] = useState('')
    const [cancion,setCancion] = useState([])
    const [artista,setArtista] = useState([])
    const [imgBanner,setImgBanner]=useState(null)
    const [imgMiniatura,setImgMiniatura]= useState(null)
    const [nomMusica,setNomMusica]=useState('')
    const [nomArtista,setNomArtista]=useState('')
    
    const inicioImg = document.querySelector('.inicioImg')
    let contador = 1

    const getCancion = async (nom)=>{
        const response = await fetchJsonp('https://api.deezer.com/search/track?q='+nom+'&index=0&limit=40&output=jsonp')
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
            getCancion('camilo')
        }else{
            getCancion(nombre)
        }
    }

    const obtener = async ()=>{
        const data = await fetchJsonp('https://api.deezer.com/search/track?q=camilo&index=0&limit=39&output=jsonp')
        const response = await data.json()
        const personas = response.data
        
        setImgBanner(imgCaricatura)
        setImgMiniatura(imgCaricatura)
        setArtista(personas)
        personas.map(item=>{
            setCancion(item.preview)
            setNomMusica('Por Primera Vez')
            setNomArtista('Camilo')
        })   
    }

    const reproducir = ()=>{
        if(contador===1){
            contador =0
            inicioImg.play()
            
        }else{
            contador =1
            inicioImg.pause()
        }   
    }
    

    useEffect(()=>{
      obtener()
      
    },[])
    return(
        <Fragment>
            <div className="busqueda">
                <div className="buscar">
                    <input type="text" placeholder="Buscar" onChange={(e)=> setNombre(e.target.value)} onKeyUp={buscarCancion} autoFocus />
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
                    <p>Prueba Flow, sólo en Deezer. Escucha tu música,
                     cuando sea y dónde sea</p>
                    <div className="button">
                        <button className="reproduce" onClick={reproducir}>Reproducir</button>
                        <button className="seguir">Seguir</button>
                    </div>
                </div>
            </div>

            <div className="resultado">
            <h1>Resultados</h1>
            <div className="musica">
                    {
                        artista.map( (item)=>(
                            <div key={item.id}  className="inf-musica">
                                <div className="playImage">
                                <LazyLoad width={"100%"} debounce={false} offset={200}>
                                    <img src={item.album.cover_big} alt=""/>

                                    <img className="playImg"  src={playImg} alt="" onClick={(e)=>ObtenerDatosId(item)} />
                                    </LazyLoad>
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