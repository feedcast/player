import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';
import './index.css';
document.querySelectorAll('.feedcast-player').forEach(e => (
	ReactDOM.render(
	  <Player media-url={e.getAttribute('media-url')} />,
	  e
	)
))
