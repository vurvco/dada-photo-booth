import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import Webcam from 'react-webcam';
import socket from 'socket.io-client';
import { Rectangle } from 'react-shapes';

import sketch from './sketch';

const serverUrl = 'http://localhost:3000';

const socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};

const client = socket.connect(serverUrl, socketOptions);

const H_KEYCODE = 72;
const SPACEBAR_KEYCODE = 32;

const Processing = ({ res }) => (<div style={{color: 'white'}}>
  {res ? <p>!!!!!!cool shit from adam!!!!!!</p> : <p>d'oh!</p>}
</div>);

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sketch,
      isGenerating: false
    };
    this.capture = this.capture.bind(this);
  }

  capture (event) {
    if (event.keyCode === H_KEYCODE) {
      console.log('Health request registered. Check output in server terminal.');
      this.client.emit('health');
    }

    if (event.keyCode === SPACEBAR_KEYCODE) {
      const imageSrc = this.refs.webcam.getScreenshot();
      this.client.emit('camera_upload', imageSrc);
      this.setState({ isGenerating: true });
    }
  }

  getFaces () {
    setInterval(() => {
      if (this.refs.webcam) {
        const screenshot = this.refs.webcam.getScreenshot();
        if (screenshot) {
          this.client.emit('image', {
            base64: screenshot.toString()
          });
        }
      }
    }, 150);
  }

  addFaces (array) {
    const client = this.client;
    const isGenerating = this.state.isGenerating;
    const el = ReactDOM.findDOMNode(this);
    const container = el.querySelector('.faces');
    const faces = (
      <div>
        {array.map(function (rect, i) {
          const topRectangle = `${rect.y}px`;
          const leftRectangle = `${rect.x}px`;
          const styleRect = {
            position: 'fixed',
            top: topRectangle,
            left: leftRectangle,
            'xIndex': 1
          };

          if (!isGenerating) client.emit('coordinates', rect);

          return <div key={i} style={styleRect}>
            <Rectangle width={rect.width}
              height={rect.height}
              fill={{color: '#2409ba', alpha: 4}}
              stroke={{color: '#E65243'}}
              strokeWidth={3} />
          </div>;
        })}
      </div>);

    if (!this.state.isGenerating) ReactDOM.render(faces, container);
  }

  componentDidMount () {
    document.addEventListener('keydown', this.capture);

    client.on('connect', () => {
      this.client = client;

      this.client.on('generating', ({ isGenerating }) => {
        this.setState({ isGenerating });
      });

      this.client.on('faces', faces => {
        this.addFaces(faces);
      });
    });
  }

  componentWillUnmount () {
    document.removeEventListener('keydown');
  }

  render () {
    const style = {position: 'static', top: 0, left: 0, 'minWidth': '100%'};
    return (
      <div className='container'>
        { this.state.isGenerating
        ? <P5Wrapper sketch={this.state.sketch} />
        : (<div>
          <div className='faces' />
          <div style={style}>
            <Webcam screenshotFormat='image/jpeg'
              ref='webcam'
              audio={false}
              onUserMedia={this.getFaces.bind(this)} />
          </div>
        </div>)
      }
      </div>
    );
  }
}
