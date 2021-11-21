import React, { Fragment, useEffect, useState } from "react";
import Buscar from "../templates/buscar";
import Banner from "../templates/banner";
import Footer from "../templates/footer";
import LazyLoad from "react-lazyload";
import fetchJsonp from "fetch-jsonp";
import playImg from "../../icons/playImage.svg";
import classnames from "classnames";
import ModalSingle from "../organisms/ModalSingle.jsx";
import "animate.css";
// import pausaImg from '../../icons/pausa.svg'

const Catalogo = () => {
  const [nombre, setNombre] = useState("");
  const [cancion, setCancion] = useState([]);
  const [artista, setArtista] = useState([]);
  const [buscador, setBuscador] = useState([]);
  const [imgBanner, setImgBanner] = useState(null);
  const [imgMiniatura, setImgMiniatura] = useState(null);
  const [nomMusica, setNomMusica] = useState("");
  const [nomArtista, setNomArtista] = useState("");
  const [controlImg, setControlImg] = useState(null);
  const [emptyArray, setEmptyArray] = useState([]);
  const [getMusicById, setGetMusicById] = useState([]);
  const [getMusicAll, setGetMusicAll] = useState([]);
  const [visible, setVisible] = useState(false);

  const inicioImg = document.querySelector(".inicioImg");
  const searchWrapper = document.querySelector(".buscar");
  const valorBuscar = document.querySelector(".valorBuscar");
  let contador = 1;
  let buscadorArtista = [];

  const getCancion = async (nom) => {
    const response = await fetchJsonp(
      `https://api.deezer.com/search/track?q=${encodeURI(
        nom
      )}&index=0&limit=10&output=jsonp`
    );
    const respuesta = await response.json();
    const datos = respuesta.data;
    // setArtista(datos)
    setBuscador(datos);

    buscadorArtista = buscador.map((item) => item.title);
    ObtenerPalabra(buscadorArtista);
  };

  const ObtenerDatosId = async (id) => {
    console.log(id);
    setCancion(id.preview);
    setImgBanner(id.album.cover_big);
    setImgMiniatura(id.album.cover);
    setNomMusica(id.title);
    setNomArtista(id.artist.name);
    await setGetMusicById({
      name: id.title,
      artist: id.artist.name,
      album: id.album.title,
      url: id.preview,
      cover_art_url: id.album.cover_big,
    });
    reproducir();
  };

  const buscarCancion = async () => {
    if (nombre === "" || !nombre.trim() || nombre.length < 0) {
      getCancion("camilo");
    } else {
      getCancion(nombre);
    }
  };

  const ObtenerPalabra = (clave) => {
    let array = [];
    if (nombre) {
      array = clave.filter((data) => {
        return data.toLocaleLowerCase();
      });
      array = array.map((data) => {
        return data;
      });
      setEmptyArray(array);
      // console.log(emptyArray)
      searchWrapper.classList.add("active");
      // showDevs(setEmptyArray)
      // let allList = suggBox.querySelectorAll('li');
      // for(let i =0;i<allList.length;i++){
      //     allList[i].setAttribute('onclick',{select});
      // }
    } else {
      // searchWrapper.style.setProperty("display", "none");
      searchWrapper.classList.remove("active");
    }
  };

  const select = async (item) => {
    // setArtista(item)
    const response = await fetchJsonp(
      "https://api.deezer.com/search/track?q=" +
        item +
        "&index=0&limit=10&output=jsonp"
    );
    const respuesta = await response.json();
    const datos = respuesta.data;
    setArtista(datos);

    // const v = {
    //   name: item.title,
    //   artist: item.artist.name,
    //   album: item.album.title,
    //   url: item.preview,
    //   cover_art_url: item.album.cover_big,
    // };
    setGetMusicAll({
      ...artista,
    });

    console.log("GetMusicAll", getMusicAll);
    valorBuscar.value = item;

    searchWrapper.classList.remove("active");
  };

  // function showDevs (list){
  //     let listData;
  //     let userValue='';
  //     if(!list.length){
  //         userValue = nombre;
  //         listData = '<li>'+userValue+'</li>'
  //     }else{
  //         listData = list.join('');
  //     }

  //     suggBox.innerHTML = listData;
  // }

  const obtener = async () => {
    const data = await fetchJsonp(
      "https://api.deezer.com/search/track?q=camilo&index=0&limit=37&output=jsonp"
    );
    const response = await data.json();
    const personas = response.data;

    setImgBanner(personas[0].album.cover_big);
    setImgMiniatura(personas[0].album.cover_medium);
    setArtista(personas);
    setCancion(personas[0].preview);
    setNomMusica(personas[0].title);
    setNomArtista(personas[0].artist.name);
    setGetMusicById({
      name: personas[0].title,
      artist: personas[0].artist.name,
      album: personas[0].album.title,
      url: personas[0].preview,
      cover_art_url: personas[0].album.cover_big,
    });
  };

  const reproducir = () => {
    if (contador === 1) {
      // setControlImg(pausaImg)
      inicioImg.play();
      contador = 0;
    } else {
      // setControlImg(playImg)
      inicioImg.pause();
      contador = 1;
    }
  };
  const openModal = () => {
    setVisible(!visible);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const classMusic = {
    musica: true,
  };
  const classModal = {
    modal_hidden: !visible,
    modal_container: visible,
    animate__animated: true,
    animate__fadeInUp: visible,
    animate__fadeInDown: !visible,
  };

  useEffect(() => {
    obtener();
    setControlImg(playImg);
  }, []);
  return (
    <Fragment>
      <Buscar
        user={emptyArray.map((item, k) => {
          return (
            <li key={k} onClick={(e) => select(item)}>
              {item}
            </li>
          );
        })}
        search_input="buscar"
        pintarBuscar="pintarClaves"
        valorBuscar="valorBuscar"
        escribe={(e) => setNombre(e.target.value)}
        cancion={buscarCancion}
      />

      <Banner
        banner={imgBanner}
        musica={nomMusica}
        artista={nomArtista}
        reproduce={reproducir}
      />

      <div className="resultado">
        <h1>Resultados</h1>
        <div className={classnames(classMusic)}>
          {artista.map((item, k) => (
            <div key={k} className="inf-musica">
              <div className="playImage">
                <LazyLoad width={"100%"} debounce={false} offset={200}>
                  <img
                    className="album"
                    src={item.album.cover_big}
                    alt={item.title}
                  />
                  <img
                    className="playImg"
                    src={playImg}
                    alt=""
                    onClick={(e) => ObtenerDatosId(item)}
                  />
                </LazyLoad>
              </div>
              <h3 className="titulo">{item.title}</h3>
              <p className="subtitulo">{item.artist.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer
        goMusic={openModal}
        id={getMusicById}
        listo={reproducir}
        musica={cancion}
        caricatura={imgMiniatura}
        nombreCancion={nomMusica}
        nomArtista={nomArtista}
        inicioImg="inicioImg"
        play={controlImg}
      />
      <div className={classnames(classModal)}>
        <ModalSingle jsonMusic={getMusicById} closeModal={closeModal} />
      </div>
    </Fragment>
  );
};
export default Catalogo;
