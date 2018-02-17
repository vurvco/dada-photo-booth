import React, { Component } from 'react';
// import AlertContainer from 'react-alert';

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

// const alertOptions = {
//   offset: 14,
//   position: 'top right',
//   theme: 'dark',
//   time: 5000,
//   transition: 'scale'
// };

const Processing = () => (<div><p>Adam\'s cool shit!</p></div>);

// const Camera = ({ setRef, capture }) => (
//   <div className='camera'>
//     <Webcam
//       audio={false}
//       height={window.innerHeight}
//       ref={setRef}
//       screenshotFormat='image/jpeg'
//       width={window.innerWidth}
//     />
//     <button onClick={capture}>GIF it</button>
//   </div>
// );

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {isGenerating: false};
    this.tracker = null;
    this.captureOnKeyDown = this.captureOnKeyDown.bind(this);
  }

  captureOnKeyDown (event) {
    if (event.keyCode.toString() === SPACEBAR_KEYCODE) {
      this.capture();
    }
  }

  capture () {
    console.log('triggered capture');
    const imageSrc = this.webcam.getScreenshot();
    console.log('imageSrc', imageSrc);
    // window.fetch(postUrl, postOptions(imageSrc))
    //   .then(res => {
    //     console.log({ res });
    //     if (res.ok) {
    //       this.showAlert('Photo Uploaded', 'success');
    //       this.setState({ isGenerating: true });
    //     } else {
    //       this.showAlert(`Upload Error: ${res.statusText}`, 'error');
    //     }
    //   })
    //   .catch(err => {
    //     console.error({ err });
    //     this.showAlert(`Upload Error: ${err.message}`, 'error');
    //   });
  }

  componentDidMount () {
    document.addEventListener('keydown', this.captureOnKeyDown, false);

    this.tracker = new window.tracking.ObjectTracker('face');
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    window.tracking.track(this.refs.cameraOutput, this.tracker, { camera: true });
    this.tracker.on('track', event => {
      let context = this.refs.canvas.getContext('2d');
      context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

      event.data.forEach(function (rect) {
        rect.y *= 0.9;
        rect.height *= 1.33;

        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.lineWidth = 5;
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });
  }

  componentWillUnmount () {
    this.tracker.removeAllListeners();
    document.addEventListener('keydown', this.captureOnKeyDown, false);
  }

  render () {
    return (
      <div className='container'>
        {
          this.state.isGenerating
            ? <Processing />
            : (<div className='camera'>
              <div className='cameraOutput'>
                <video ref='cameraOutput' width='640' height='480' preload autoPlay loop muted />
                <canvas ref='canvas' width='640' height='480' />
              </div>
              <button onClick={this.capture}>GIF it</button>
            </div>)
        }
      </div>
    );
  }
}

// class App extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {isGenerating: false};

//     this.setRef = (webcam) => {
//       this.webcam = webcam;
//     };

//     this.showAlert = (text, type) => {
//       this.msg.show(text, {
//         type,
//         time: 3000
//       });
//     };

//     this.capture = () => {
//       const imageSrc = this.webcam.getScreenshot();
//       window.fetch(postUrl, postOptions(imageSrc))
//         .then(res => {
//           console.log({ res });
//           if (res.ok) {
//             this.showAlert('Photo Uploaded', 'success');
//             this.setState({ isGenerating: true });
//           } else {
//             this.showAlert(`Upload Error: ${res.statusText}`, 'error');
//           }
//         })
//         .catch(err => {
//           console.error({ err });
//           this.showAlert(`Upload Error: ${err.message}`, 'error');
//         });
//     };
//   }

//   render () {
//     return (
//       <div className='App'>
//         <AlertContainer ref={a => { this.msg = a; }} {...alertOptions} />
//         {this.state.isGenerating
//           ? <Processing />
//           : <Camera setRef={this.setRef} capture={this.capture} />}
//       </div>
//     );
//   }
// }

// export default App;
