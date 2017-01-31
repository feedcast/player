import React, { Component } from 'react';

class Countdown extends Component {
  componentDidMount() {
    if(this.props.autoplay && (this.props['total-seconds'] - 10) > 0 && this.props['seconds-now'] > (this.props['total-seconds'] - 10)) {
      this.updateCanvas();
    }
  }

  componentDidUpdate(){
    if(this.props.autoplay && (this.props['total-seconds'] - 10) > 0 && this.props['seconds-now'] > (this.props['total-seconds'] - 10)) {
      this.updateCanvas();
    }
  }
  updateCanvas(){
    let canvas = this.refs.countdown

    let ctx = canvas.getContext('2d');
    //let percent =  this.props.percent || 0

    let percent = (( this.props['seconds-now'] - (this.props['total-seconds'] - 10) ) * 100) / 10

    let degrees = ( ( (percent * -1) * 2 ) / 100 ) * Math.PI

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(52,52,50,0,degrees, true);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(30, 27);
    ctx.lineTo(80, 52);
    ctx.lineTo(30, 77);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }


  render(){
    if(this.props.autoplay &&
      (this.props['total-seconds'] - 10) > 0 &&
      this.props['seconds-now'] > (this.props['total-seconds'] - 10)) {
      return (
        <div>
          <canvas className="fc-player__canvas-countdown"  ref="countdown" width={104} height={104}/>
          <button className="fc-player__button-countdown" onClick={(e)=> this.props.cancel(e)}>Cancelar</button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}

export default Countdown