import React, { Component } from 'react';
import Player from './components/WebPlayer';
import MobilePlayer from './components/MobilePlayer';

import './css/App.css';

class App extends Component {

  render() {
    const fp = window.feedcastPlayer
    const Layout = !fp.mobilecheck()? Player:MobilePlayer

    return (
      <div className={this.props['image-url'].length > 0?
        'fc-player fc-player--has-cover':'fc-player'}>
        <Layout
          title={this.props['title']}
          image-url={this.props['image-url']}
          media-url={this.props['media-url']}
          download-url={this.props['download-url']}
          next-episode={this.props['next-episode']}
          audio-wave={this.props['audio-wave']}
        />
      </div>
    );
  }
}

export default App;
