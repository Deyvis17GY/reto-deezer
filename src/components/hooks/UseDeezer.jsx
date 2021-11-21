import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";

const UseDeezer = () =>{
  const [musica, setMusica] = useState([]);

  const getMusica = async (nom) => {
    const res = await fetchJsonp('https://api.deezer.com/search/track?q='+nom+'&index=0&limit=40&output=jsonp')
      setMusica(res.data);
  };
    useEffect(()=>{
        getMusica(nombre)
    },[])
    return(
        musica          
          
    )
}
export default UseDeezer