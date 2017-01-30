import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './helpers/feedcastPlayer';

function findPlayer(){
  const fcPlayer = document.querySelector('.feedcast-player')
  if(fcPlayer){
    clearInterval(window.findPlayerInterval);
    ReactDOM.render(
      <App
        media-url={fcPlayer.getAttribute('data-media-url') || ''}
        download-url={fcPlayer.getAttribute('data-download-url') || ''}
        next-episode={fcPlayer.getAttribute('data-next-episode') || ''}
        image-url={fcPlayer.getAttribute('data-image-url') || ''}
        title={fcPlayer.getAttribute('data-title') || ''}
        audio-wave-color={fcPlayer.getAttribute('data-audio-wave-color') || ''}
        audio-wave={JSON.parse(fcPlayer.getAttribute('data-audio-wave')) || null}
      />,
      fcPlayer
    )
  }
}
window.findPlayerInterval = setInterval(findPlayer, 5);