import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';
import './index.css';

window.onload = function(){
	const fcPlayer = document.querySelector('.feedcast-player')

	ReactDOM.render(
	  <Player media-url={fcPlayer.getAttribute('media-url')} />,
	  fcPlayer
	)
}
