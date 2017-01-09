import React, { Component } from 'react';
import './App.css';
import buzz from 'buzz'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaUrl : this.props['media-url'],
      canPlay : false,
      playing: false,
      percent: 0
    }
    this.createSound(this.props['media-url'])
  }


  createSound(url){
    this.sound = new buzz.sound(url, {
      preload: true
    });

    this.sound.bind('canplay', (e) => this.setState({canPlay: true}))
    this.sound.bind('progress', (e) => this.onProgress(e))
  }

  onProgress(e){
    let time = this.sound.getTime();
    let duration = this.sound.getDuration();
    let percent  = buzz.toPercent(time, duration, 1);
    this.setState({percent})
  }

  playMedia(e){
    console.count('playMedia')
    this.sound.play();
    this.setState({ playing: true })
  }

  pauseMedia(e){
    console.count('pauseMedia')
    this.sound.pause();
    this.setState({ playing: false })
  }

  changePercent(e){
    let p = e.target.value
    this.setState({ percent: p }, () => {
      this.sound.setPercent(p)
    })
  }


  render() {
    return (
      <div className="fc-player">
        <div className="fc-player__wrapper">
          <input
            disabled={!this.state.playing}
            className="fc-player__slide"
            type="range"
            min="0"
            max="100"
            step="0.1"
            defaultValue="0"
            value={this.state.percent}
            onChange={e => this.changePercent(e)}
          />
          <button className="fc-player__button-play" disabled={!this.state.canPlay} onClick={e => this.playMedia(e)}>Play</button>
          <button className="fc-player__button-pause" disabled={!this.state.playing} onClick={e => this.pauseMedia(e)}>Pause</button>
        </div>
      </div>
    );
  }
}

export default Player;
