import React, { Component } from 'react';
import HeaderPodcast from './items/HeaderPodcast';


class MobilePlayer extends Component {
	constructor(props){
		super();
	}

  render(){
    return (
      <div className="fc-player__wrapper">
        <HeaderPodcast
          audio-wave={this.props['audio-wave']}
          title={this.props['title']}
          image-url={this.props['image-url']}
        />
        <audio controls className="fc-player__mobile-layout">
          <source src={this.props['media-url']} type="audio/mpeg"/>
        </audio>
      </div>
    )
  }

}

export default MobilePlayer