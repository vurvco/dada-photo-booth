import React, { Component } from 'react';
import AlertContainer from 'react-alert';

import './App.css';

require('tracking');
require('tracking/build/data/face');

const SPACEBAR_KEYCODE = '32';

const postUrl = 'http://localhost:8888/camera_upload';

const postOptions = src => ({
  method: 'POST',
  body: JSON.stringify({ image: src }),
  headers: {
    'Content-Type': 'application/json'
  }
});

const alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
};

// const Processing = () => (<div><p>cool shit from adam!</p></div>);

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = { isGenerating: false };
    this.tracker = null;
    this.capture = this.capture.bind(this);
    this.captureEvent = this.captureEvent.bind(this);
    this.captureOnKeyDown = this.captureOnKeyDown.bind(this);
  }

  showAlert (text, type) {
    this.msg.show(text, {
      type,
      time: 3000
    });
  }

  captureOnKeyDown (event) {
    if (event.keyCode.toString() === SPACEBAR_KEYCODE) {
      // this.capture(event);
    }
  }

  captureEvent (event) {
    this.capture(event);
  }

  // capture (event) {
  //   /*
  //     navigator.getUserMedia({video: true}, function(stream) {
  //       video.src = window.URL.createObjectURL(stream);
  //       localMediaStream = stream;
  //     }, function(error){console.error(error)});
  //   */
  //   window.navigator.getUserMedia({video: true}, (stream) => {
  //     document.querySelector('video').src = window.URL.createObjectURL(stream);
  //     document.querySelector('a').href = this.refs.canvas.toDataURL('image/png');
  //     window.fetch(postUrl, postOptions(this.refs.canvas.toDataURL('image/png')))
  //       .then(res => {
  //         if (res.ok) {
  //           this.showAlert('Photo Uploaded', 'success');
  //           this.setState({ isGenerating: true });
  //         } else {
  //           this.showAlert(`Upload Error: ${res.statusText}`, 'error');
  //         }
  //       })
  //       .catch(err => {
  //         console.error({ err });
  //         this.showAlert(`Upload Error: ${err.message}`, 'error');
  //       });
  //   }, (error) => { console.error(`Err in gum cb: ${error}`); });
  // }

  // componentDidMount () {
  //   // Capture image with spacebar
  //   document.addEventListener('keydown', this.captureOnKeyDown, false);

  //   this.tracker = new window.tracking.ObjectTracker('face');
  //   this.tracker.setInitialScale(4);
  //   this.tracker.setStepSize(2);
  //   this.tracker.setEdgesDensity(0.1);

  //   window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: true });
  //   this.tracker.on('track', (event) => {
  //     // Stop app from erroring when `<canvas>` gets hidden
  //     if (this.refs.canvas) {
  //       let context = this.refs.canvas.getContext('2d');
  //       context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

  //       event.data.forEach((rect) => {
  //         let { x, y, width, height } = rect;
  //         y *= 0.9;
  //         height *= 1.33;

  //         context.strokeStyle = '#a64ceb';
  //         context.strokeRect(x, y, width, height);
  //         context.lineWidth = 5;
  //         context.font = '11px Helvetica';
  //         context.fillStyle = '#fff';
  //         context.fillText(`x: ${x}px`, x + width + 5, y + 11);
  //         context.fillText(`y: ${y}px`, x + width + 5, y + 22);
  //       });
  //     }
  //   });
  // }

  // componentWillUnmount () {
  //   this.tracker.removeAllListeners();
  //   document.addEventListener('keydown', this.captureOnKeyDown, false);
  // }

  render () {
    return (
      <div className='container'>
        {/* <AlertContainer ref={a => { this.msg = a; }} {...alertOptions} />
        {
          this.state.isGenerating
            ? <Processing />
            : (<div className='camera'>
              <div className='cameraOutput'>
                <video ref='cameraOutput' width='640' height='480' preload autoPlay loop muted />
                <canvas ref='canvas' width='640' height='480' />
              </div>
              <a className='button' href='' download='snapshot.png' onClick={this.captureEvent}>GIF it</a>
            </div>)
        } */}
      </div>
    );
  }
}
