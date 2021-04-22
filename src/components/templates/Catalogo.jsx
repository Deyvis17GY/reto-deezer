import React, { Fragment, useEffect, useState } from 'react'
import Buscar from '../templates/buscar'
import Banner from '../templates/banner'
import Footer from '../templates/footer'
import LazyLoad from 'react-lazyload'
import imgCaricatura from '../../img/caricatura.png'
import fetchJsonp from 'fetch-jsonp'
import playImg from '../../icons/playImage.svg'
// import pausaImg from '../../icons/pausa.svg'

const Catalogo = () =>{
    const [nombre,setNombre] = useState('')
    const [cancion,setCancion] = useState([])
    const [artista,setArtista] = useState([])
    const [imgBanner,setImgBanner]=useState(null)
    const [imgMiniatura,setImgMiniatura]= useState(null)
    const [nomMusica,setNomMusica]=useState('')
    const [nomArtista,setNomArtista]=useState('')
    const [controlImg,setControlImg]=useState(null)
    
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
        const data = await fetchJsonp('https://api.deezer.com/search/track?q=camilo&index=0&limit=37&output=jsonp')
        const response = await data.json()
        const personas = response.data
        
        setImgBanner(imgCaricatura)
        setImgMiniatura(imgCaricatura)
        setArtista(personas)
        personas.map(item=>{
            setCancion(item.preview)
            setNomMusica('Por Primera Vez')
            setNomArtista('Camilo')
            return
        })   
    }

    const reproducir= ()=>{
        if(contador===1){
            // setControlImg(pausaImg)
            inicioImg.play()
            contador =0
        }else{
            // setControlImg(playImg)
            inicioImg.pause()
            contador =1            
        }   
    }

    useEffect(()=>{
      obtener()
      setControlImg(playImg)
    },[])
    return(
        <Fragment>
            <Buscar escribe={(e)=> setNombre(e.target.value)} cancion={buscarCancion} />

            <Banner banner={imgBanner} musica={nomMusica} artista={nomArtista} reproduce={reproducir}/>


            <div className="resultado">
            <h1>Resultados</h1>
            <div className="musica">
                    {
                        artista.map( (item,k)=>(
                            <div key={k}  className="inf-musica">
                              <div className="playImage">
                                <LazyLoad width={"100%"} debounce={false} offset={200}>
                                    <img className="album" src={item.album.cover_big} alt={item.title} />
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

            <Footer  listo={reproducir} musica={cancion}
             caricatura={imgMiniatura} nombreCancion={nomMusica} 
             nomArtista={nomArtista} inicioImg="inicioImg"
             play={controlImg}
              
            />
        </Fragment>
    )
}
export default Catalogo