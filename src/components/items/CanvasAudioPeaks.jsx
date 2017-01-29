import React, { Component } from 'react';

class CanvasAudioPeaks extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas(){
    let canvas = this.refs.audiowave

    let ctx = canvas.getContext('2d');
    let middle = canvas.height / 2
    let peaks = this.props['audio-wave']

    //Find bigger number in array, this is the 100%
    let bigger = peaks.slice().sort(function(a, b){ return a - b }).pop()


    //Line at the middle of canvas on horizontal
    // ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    // ctx.fillRect (0, middle, canvas.width, 1);

    for(let i = 0; i < canvas.width; i++){
      let index = peaks.length > canvas.width? parseInt((i*peaks.length)/canvas.width) : i;
      let height = (((peaks[index]*100)/bigger)*middle)/100
      let waveColor = this.props['audio-wave-color'];
      ctx.fillStyle = (waveColor.length > 0)? waveColor : "#fff";
      ctx.fillRect (i, ( middle - height), 1, ( height * 2 ) );
    }
  }


  render(){
    const fp = window.feedcastPlayer;
    const canvasClass = "fc-player__canvas";

    if(typeof this.props['audio-wave'] === 'object'){
      return (
        <canvas className={!fp.mobilecheck()? `${canvasClass}--web ${canvasClass}`:`${canvasClass}--mobile ${canvasClass}`}  ref="audiowave" width={1366} height={50}/>
      )
    }
  }

}

export default CanvasAudioPeaks