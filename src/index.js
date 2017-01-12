import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';

window.onload = function(){
	const fcPlayer = document.querySelector('.feedcast-player')

	ReactDOM.render(
		<Player
			media-url={fcPlayer.getAttribute('data-media-url') || ''}
			download-url={fcPlayer.getAttribute('data-download-url') || ''}
			next-episode={fcPlayer.getAttribute('data-next-episode') || ''}
		/>,
		fcPlayer
	)
}
