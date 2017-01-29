import React, { Component } from 'react';
import CanvasAudioPeaks from './CanvasAudioPeaks'

class HeaderPodcast extends Component {
	constructor(props){
		super();
	}

  render(){

    const coverBgStyles = {
      backgroundImage: `url(${this.props['image-url']})`
    }
    const coverBg = this.props['image-url'].length > 0 ?
      (<div className="fc-player__wrapper--has-cover" style={coverBgStyles}>
      </div>) :  '';

    const stateHeader = this.props['image-url'].length > 0 ||
                        this.props['title'].length > 0;

    const headerStyles = {
      height: this.props['image-url'].length > 0 ? '300px' : '85px',
      backgroundImage: `url(${this.props['image-url']})`,
    }

    const headerPodcast = stateHeader ?
      (<div className="fc-player__header" style={headerStyles}>
        <h1>{this.props['title']}</h1>
        <CanvasAudioPeaks audio-wave={this.props['audio-wave']} audio-wave-color={this.props['audio-wave-color']} />
      </div>) :  '';

    return (
      <div>
        {coverBg}
        {headerPodcast}
      </div>
      )
  }

}

export default HeaderPodcast