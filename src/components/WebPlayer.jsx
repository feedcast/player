import React, { Component } from 'react';
import buzz from 'buzz'

import HeaderPodcast from './items/HeaderPodcast'

class Player extends Component {
  constructor(props) {
    super(props);
    let hasAutoplay = this.defineAutoplay()
    let volume = this.defineVolume()
    let speed = this.defineSpeed()
    this.state = {
      hasAutoplay,
      isMobile: window.feedcastPlayer.mobilecheck(),
      mediaUrl : this.props['media-url'],
      downloadUrl : this.props['download-url'],
      nextEpisode : this.props['next-episode'],
      imageUrl : this.props['image-url'],
      title : this.props['title'],
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
      volume,
      speed
    }

    if(!this.state.isMobile){
      this.createSound(this.props['media-url'])

      let interval = setInterval(() => {
        if(document.querySelectorAll('.fc-player__time-range') !== null){
          clearInterval(interval);
          document.querySelector('.fc-player__time-range').onmousemove = this.mouseMove.bind(this)
          let wrapper = document.querySelector('.fc-player__wrapper');
          if(wrapper.clientWidth < 480)
              wrapper.className += ' fc-player__wrapper--mobile';
          window.onresize = function(){
            let wrapper = document.querySelector('.fc-player__wrapper');
            if(wrapper.clientWidth < 430){
              if(wrapper.className.indexOf('fc-player__wrapper--mobile') === -1){
                wrapper.className += ' fc-player__wrapper--mobile';
              }
            } else {
                wrapper.className = wrapper.className.replace(new RegExp(' fc-player__wrapper--mobile', 'g'),'');
            }
          }
        }
      }, 10);
    }


  }

  defineAutoplay(){
    if(window.feedcastPlayer.readCookie('feedcast.autoplay') === null ||
      window.feedcastPlayer.readCookie('feedcast.autoplay') === false ||
      typeof window.feedcastPlayer.readCookie('feedcast.autoplay') === 'undefined'){
      return false
    }
    return true
  }

  defineVolume(){
    if(window.feedcastPlayer.readCookie('feedcast.volume') === null ||
      window.feedcastPlayer.readCookie('feedcast.volume') === false ||
      typeof window.feedcastPlayer.readCookie('feedcast.volume') === 'undefined'){
      return 100
    }
    return window.feedcastPlayer.readCookie('feedcast.volume')
  }

  defineSpeed(){
    if(window.feedcastPlayer.readCookie('feedcast.speed') === null ||
      window.feedcastPlayer.readCookie('feedcast.speed') === false ||
      typeof window.feedcastPlayer.readCookie('feedcast.speed') === 'undefined'){
      return 1
    }
    return parseInt(window.feedcastPlayer.readCookie('feedcast.speed'))
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
      preload: true,
      autoplay: this.state.hasAutoplay,
      volume: this.state.volume
    });

    this.sound.bind('canplay', (e) => {
      this.setState({
        canPlay: true,
        duration: buzz.toTimer(this.sound.getDuration())
      });
      this.sound.setSpeed(this.state.speed)
    })
    this.sound.bind('timeupdate', (e) => this.onProgress(e))
    this.sound.bind('progress', (e) => this.onProgress(e))
    this.sound.bind('ended', (e) => this.onEnd(e))
    this.sound.bind('pause', (e) => this.pauseMedia(e, true))
    this.sound.bind('play', (e) => this.playMedia(e, true))
  }

  onEnd(e){
    this.pauseMedia()
    if(this.state.nextEpisode.length > 0 && this.state.hasAutoplay){
      window.location.href = this.state.nextEpisode
    }
  }


  onProgress(e){
    try{
      let audio = this.sound.sound
      let buffer = (audio.buffered.end(audio.buffered.length-1) * 100 ) / this.sound.sound.duration;
      let percent  = buzz.toPercent(
                      this.sound.getTime(),
                      this.sound.getDuration(), 1);
      let time = buzz.toTimer(this.sound.getTime());

      this.setState({percent, time, buffer})
    } catch(e){
      return false;
    }
  }

  playMedia(e, silent){
    if(silent === false ||
      typeof silent === "undefined"){
      this.sound.play();
    }
    this.setState({ playing: true, firstPlay: true })
  }

  pauseMedia(e, silent){
    if(silent === false ||
      typeof silent === "undefined"){
      this.sound.pause();
    }
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

  changeSpeed(){
    switch(this.state.speed){
      case 1:
      case 2:
        this.setState({ speed: (this.state.speed + 1) }, ()=>{
          this.sound.setSpeed(this.state.speed)
          window.feedcastPlayer.setCookie('feedcast.speed', this.state.speed, 7)
        })
      break;
      default:
      case 3:
        this.setState({ speed: 1 }, ()=>{
          this.sound.setSpeed(this.state.speed)
          window.feedcastPlayer.setCookie('feedcast.speed', 1, 7)
        })
      break;
    }
  }

  setVolume(volume){
    this.setState({volume})
    this.sound.setVolume(volume)
    window.feedcastPlayer.setCookie('feedcast.volume', volume, 7)
  }

  toggleAutoplay(e){
    if(!this.state.hasAutoplay){
      window.feedcastPlayer.createCookie('feedcast.autoplay','true',7);
    } else {
      window.feedcastPlayer.eraseCookie('feedcast.autoplay');
    }
    this.setState({hasAutoplay: !this.state.hasAutoplay})
  }

  iconVolume(volume){
    let classe;
    switch(!0){
      default:
      case volume > 50:
        classe ='fa fa-volume-up'; break;
      case volume > 0 && volume <= 50:
        classe ='fa fa-volume-down'; break;
      case volume <= 0:
        classe ='fa fa-volume-off'; break;
    }
    return classe;
  }
  render() {
    const styleBuffer = {  width: `calc( calc(100% - 176px) * ${this.state.buffer / 100})` }
    const stylePlayed = {  width: `calc( calc(100% - 176px) * ${this.state.percent / 100})` }
    const styleTooltip = {  display: (this.state.hideTime) ? 'none' : 'block', left: `${this.state.timeTooltip}px`}
    const isPlay = !this.state.firstPlay || !this.state.playing;

    const downloadButton = (this.state.downloadUrl.length > 0)?
      ( <a title="Baixar episódio" href={this.state.downloadUrl} download target="_blank">
          <i className="fa fa-download"></i>
        </a> ) :  '';

    const coverBgStyles = {
      backgroundImage: `url(${this.state.imageUrl})`
    }
    const coverBg = this.state.imageUrl.length > 0 ?
      (<div className="fc-player__wrapper--has-cover" style={coverBgStyles}>
      </div>) :  '';

    return (
      <div className="fc-player__wrapper">
        <div className={this.state.imageUrl.length > 0? 'fc-player fc-player--has-cover':'fc-player'}>
          <div className="fc-player__wrapper">
            {coverBg}
            <HeaderPodcast
              audio-wave={this.props['audio-wave']}
              title={this.props['title']}
              image-url={this.props['image-url']}
            />
            <div className={this.state.imageUrl.length > 0? 'fc-player__time-range fc-player__time-range--has-cover':'fc-player__time-range'}>
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
            <div className={this.state.imageUrl.length > 0? 'fc-player__controls fc-player__controls--has-cover':'fc-player__controls'}>
              <div className="fc-player__controls-group">
                <button title={ "Voltar " + (15 * this.state.speed) + " segundos"} disabled={!this.state.firstPlay} className="fc-player__backward" onClick={e => this.sound.setTime(this.sound.getTime() - (15 * this.state.speed))}>
                  -{(15 * this.state.speed)}
                </button>
                <button title={ isPlay ? "Tocar episódio" : "Pausar episódio"}
                        className={ isPlay ? "fc-player__button-play" : "fc-player__button-pause"}
                        disabled={!this.state.canPlay}
                        onClick={e => isPlay ?  this.playMedia(e) : this.pauseMedia(e)}>
                  <i className={ isPlay ? "fa fa-play" : "fa fa-pause"}></i>
                </button>
                <button title={ "Avançar " + (15 * this.state.speed) + " segundos"} disabled={!this.state.firstPlay} className="fc-player__forward" onClick={e => this.sound.setTime(this.sound.getTime() + (15 * this.state.speed))}>
                  +{(15 * this.state.speed)}
                </button>
              </div>
              <div className="fc-player__speed">
                <button title="Mudar velocidade" className="active" onClick={() => this.changeSpeed(1) }>{this.state.speed}x</button>
                <button title="Reprodução automática" className={this.state.hasAutoplay? 'active' : ''} onClick={e => this.toggleAutoplay(e)}><i className="fa fa-refresh"></i></button>
                {downloadButton}
              </div>
              <div className="fc-player__volume">
                <i className={this.iconVolume(this.state.volume)}></i>
                <input title="Alterar volume" className="fc-player__volume-slider" type="range" min="0" max="100" step="1" value={this.state.volume} onChange={e => this.setVolume(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
