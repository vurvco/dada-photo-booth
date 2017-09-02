import React, { Component } from 'react';
import AlertContainer from 'react-alert'
import Webcam from 'react-webcam';

import './App.css';

const postUrl = 'http://cors-anywhere.herokuapp.com/https://requestb.in/r2gkeyr2';

const postOptions = src => ({
  method: 'POST',
  body: JSON.stringify(src),
  headers: {
    'Content-Type': 'image/jpeg'
  }
});

const alertOptions = {
  offset: 14,
  position: 'top right',
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}

class App extends Component {
  showAlert = (text, type) => {
    this.msg.show(text, {
      type,
      time: 3000
    })
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    fetch(postUrl, postOptions(imageSrc))
      .then(res => {
        console.log({ res });
        this.showAlert('Photo Uploaded', 'success');
      })
      .catch(err => {
        console.error({ err });
        this.showAlert(`Photo Error: ${err.message}`, 'error');
      });
  }

  render () {
    return (
      <div className='App'>
        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
        <Webcam
          audio={false}
          height={window.innerHeight}
          ref={this.setRef}
          screenshotFormat='image/jpeg'
          width={window.innerWidth}
        />
        <button onClick={this.capture}>GIF it</button>
      </div>
    );
  }
}

export default App;
