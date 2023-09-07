import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import {API_KEY, imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';

function Rowpost(props) {
  const [movies, setMovies] = useState([]);
  const [UrlId,setUrlId]=useState('')

  useEffect(() => {
    axios
      .get(props.urls)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((error) => {
        alert('Error making the request:', error);
      });
  }, [props.urls]);
  const opts={
    height:'390',
    width:'100%',
    playerVars:{
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    
    },
  };
  const handleMovie=(id)=>{
console.log(id);
axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`).then(response=>{
  console.log(response.data)
    if(response.data.results.length!==0){
    setUrlId(response.data.results[0])
  }else{
    console.log('array empty')
  }

}).catch((error) => {
  alert('Error making the request:', error);
});
  }
  const _onReady=(e)=> {
    
    e.target.pauseVideo();
  }
  

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) => (
          <img onClick={()=>{handleMovie(obj.id)}}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt='poster'
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      {UrlId &&<YouTube opts={opts} videoId={UrlId.key} onReady={_onReady}/>}
    </div>
  );
   
}

export default Rowpost;
