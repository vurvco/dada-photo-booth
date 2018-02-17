import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import Webcam from 'react-webcam';

import './App.css';

// For RequestBin
// const postUrl = 'http://cors-anywhere.herokuapp.com/https://requestb.in/r2gkeyr2';
// For Docker
// const postUrl = 'http://localhost:49160/camera_upload';
// For Node
const postUrl = 'http://localhost:8888/camera_upload';
// todo: add `/camera_upload` to postUrl

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


const Processing = () => (<div>Adam's cool shit!</div>);

const Camera = ({ setRef, capture }) => (
  <div className="camera">
    <Webcam
      audio={false}
      height={window.innerHeight}
      ref={setRef}
      screenshotFormat='image/jpeg'
      width={window.innerWidth}
    />
    <button onClick={capture}>GIF it</button>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isGenerating: false};
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  showAlert = (text, type) => {
    this.msg.show(text, {
      type,
      time: 3000
    });
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    window.fetch(postUrl, postOptions(imageSrc))
      .then(res => {
        console.log({ res });
        if (res.ok) {
          this.showAlert('Photo Uploaded', 'success');
          this.setState({ isGenerating: true });
        } else {
          this.showAlert(`Upload Error: ${res.statusText}`, 'error');
        }
      })
      .catch(err => {
        console.error({ err });
        this.showAlert(`Upload Error: ${err.message}`, 'error');
      });
  }

  render () {
    return (
      <div className='App'>
        <AlertContainer ref={a => { this.msg = a; }} {...alertOptions} />
        {this.state.isGenerating
          ? <Processing />
          : <Camera setRef={this.setRef} capture={this.capture} />}
      </div>
    );
  }
}

export default App;
