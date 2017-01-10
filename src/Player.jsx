import React, { Component } from 'react';
import './App.css';
import buzz from 'buzz'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaUrl : this.props['media-url'],
      canPlay : false,
      firstPlay : false,
      playing: false,
      percent: 0,
      time: '000:00',
      duration: '000:00',
      buffer: 0,
      hideTime: true,
      timeTooltip: 0,
      tooltipText: '000:00',
      volume:100,
      speed: 1
    }
    this.createSound(this.props['media-url'])
    let interval = setInterval(() => {
      if(document.querySelectorAll('.fc-player__time-range') !== null){
        clearInterval(interval);
          document.querySelector('.fc-player__time-range').onmousemove = this.mouseMove.bind(this)
      }
    }, 100)
  }


  showTooltip(){
    this.setState({hideTime: false})
  }

  hideTooltip(){
    this.setState({hideTime: true})
  }

  mouseMove(e){
    if(!this.state.hideTime && e.offsetX){
      let percent = (e.offsetX * 100) / e.target.clientWidth
      let calc = ( percent * this.sound.getDuration() ) / 100;
      let text = buzz.toTimer(calc)
      this.setState({ timeTooltip: e.offsetX, tooltipText: text })
    }
  }


  createSound(url){
    this.sound = new buzz.sound(url, {
      preload: true
    });

    this.sound.bind('canplay', (e) => {
      this.setState({canPlay: true, duration: buzz.toTimer(this.sound.getDuration())})
    })
    this.sound.bind('timeupdate', (e) => this.onProgress(e))
    this.sound.bind('progress', (e) => this.onProgress(e))
  }

  onProgress(e){
    let audio = this.sound.sound
    let buffer = (audio.buffered.end(audio.buffered.length-1) * 100 ) / this.sound.sound.duration;
    let percent  = buzz.toPercent(
                    this.sound.getTime(),
                    this.sound.getDuration(), 1);
    let time = buzz.toTimer(this.sound.getTime());

    this.setState({percent, time, buffer})
  }

  playMedia(e){
    this.sound.play();
    this.setState({ playing: true, firstPlay: true })
  }

  pauseMedia(e){
    this.sound.pause();
    this.setState({ playing: false })
  }

  changePercent(e){
    this.pauseMedia()
    let p = e.target.value
    this.setState({ percent: p }, () => {
      this.sound.setPercent(p)
    })
    this.playMedia()
  }

  setSpeed(speed){
    this.setState({speed})
    this.sound.setSpeed(speed)
  }

  setVolume(volume){
    this.setState({volume})
    this.sound.setVolume(volume)
  }

  iconVolume(volume){
    switch(!0){
      default:
      case volume > 50:
        return 'fa fa-volume-up';
      break;
      case volume > 0 && volume <= 50:
        return 'fa fa-volume-down';
      break;
      case volume <= 0:
        return 'fa fa-volume-off';
      break;
    }
  }
  render() {
    const styleBuffer = {  width: `calc( calc(100% - 170px) * ${this.state.buffer / 100})` }
    const stylePlayed = {  width: `calc( calc(100% - 170px) * ${this.state.percent / 100})` }
    const styleTooltip = {  display: (this.state.hideTime) ? 'none' : 'block', left: `${this.state.timeTooltip}px`}
    const isPlay = !this.state.firstPlay || !this.state.playing;

    return (
      <div className="fc-player">
        <div className="fc-player__wrapper">
          <div className="fc-player__time-range">
            <div className="fc-player__tooltip" style={styleTooltip}>{this.state.tooltipText}</div>
            <div className="fc-player__buffered" style={styleBuffer} ></div>
            <div className="fc-player__played" style={stylePlayed} ></div>
            <input
              onMouseEnter={e => this.showTooltip(e)}
              onMouseLeave={e => this.hideTooltip(e)}
              onMouseMove={e => this.mouseMove(e)}
              disabled={!this.state.firstPlay}
              className="fc-player__slide"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={this.state.percent}
              onChange={e => this.changePercent(e)}
            />
            <div className="fc-player__time">
              <span className="fc-player__current-time">{this.state.time}</span> / <span className="fc-player__duration">{this.state.duration}</span>
            </div>
          </div>
          <div className="fc-player__controls">
            <button disabled={!this.state.firstPlay} className="fc-player__backward" onClick={e => this.sound.setTime(this.sound.getTime() - (15 * this.state.speed))}>
              <i className="fa fa-fast-backward"></i>
            </button>
            <button className={ isPlay ? "fc-player__button-play" : "fc-player__button-pause"}
                    disabled={!this.state.canPlay}
                    onClick={e => { isPlay ? this.playMedia(e) : this.pauseMedia(e)} }>
              <i className={ isPlay ? "fa fa-play" : "fa fa-pause"}></i>
            </button>
            <button disabled={!this.state.firstPlay} className="fc-player__forward" onClick={e => this.sound.setTime(this.sound.getTime() + (15 * this.state.speed))}>
              <i className="fa fa-fast-forward"></i>
            </button>
            <div className="fc-player__speed">
              <button className={ this.state.speed === 1? 'active' : ''} onClick={() => this.setSpeed(1) }>1x</button>
              <button className={ this.state.speed === 2? 'active' : ''} onClick={() => this.setSpeed(2) }>2x</button>
              <a href={this.state.mediaUrl} download>
                <i className="fa fa-download"></i>
              </a>
            </div>
            <div className="fc-player__volume">
              <i className={this.iconVolume(this.state.volume)}></i>
              <input className="fc-player__volume-slider" type="range" min="0" max="100" step="1" value={this.state.volume} onChange={e => this.setVolume(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
