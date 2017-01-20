import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './helpers/feedcastPlayer';

window.onload = function(){
	const fcPlayer = document.querySelector('.feedcast-player')

    if(fcPlayer){
    	ReactDOM.render(
    		<App
    			media-url={fcPlayer.getAttribute('data-media-url') || ''}
    			download-url={fcPlayer.getAttribute('data-download-url') || ''}
                next-episode={fcPlayer.getAttribute('data-next-episode') || ''}
                image-url={fcPlayer.getAttribute('data-image-url') || ''}
    			title={fcPlayer.getAttribute('data-title') || ''}
    		/>,
    		fcPlayer
    	)
    }

}
