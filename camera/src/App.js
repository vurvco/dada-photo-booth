import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import socket from 'socket.io-client';
import { Rectangle } from 'react-shapes';

const serverUrl = 'http://localhost:3000';

const socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};

const client = socket.connect(serverUrl, socketOptions);

const H_KEYCODE = 72;
const SPACEBAR_KEYCODE = 32;

const subscribeToGlitch = (client, cb) => {
  client.on('glitch_response', response => cb(null, response));
};

const Processing = ({ res }) => (<div style={{color: 'white'}}>
  {res ? <p>!!!!!!cool shit from adam!!!!!!</p> : <p>d'oh!</p>}
</div>);

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isGenerating: false,
      glitchRes: false
    };
    this.capture = this.capture.bind(this);
  }

  capture (event) {
    if (event.keyCode === H_KEYCODE) {
      this.client.emit('health');
    }

    if (event.keyCode === SPACEBAR_KEYCODE) {
      const imageSrc = this.refs.webcam.getScreenshot();
      // todo: pass in the rect dimensions here
      // todo: crop photo to dimensions on server side
      this.client.emit('camera_upload', imageSrc);
      this.setState({ isGenerating: true });

      setTimeout(() => {
        this.setState({ isGenerating: false });
      }, 2000);
    }
  }

  getFaces () {
    setInterval(() => {
      if (this.refs.webcam) {
        const screenshot = this.refs.webcam.getScreenshot();
        if (screenshot) {
          this.client.emit('image', {base64: screenshot.toString()});
        }
      }
    }, 150);
  }

  addFaces (array) {
    let el = ReactDOM.findDOMNode(this);
    let container = el.querySelector('.faces');
    const faces = (
      <div>
        {array.map(function (rect, i) {
          const topRectangle = rect.y + 'px';
          const leftRectangle = rect.x + 'px';

          const styleRectangle = {position: 'fixed', top: topRectangle, left: leftRectangle, 'xIndex': 1};
          return <div key={i} style={styleRectangle}>
            <Rectangle width={rect.width}
              height={rect.height}
              fill={{color: '#2409ba', alpha: 4}}
              stroke={{color: '#E65243'}}
              strokeWidth={3} />
          </div>;
        })}
      </div>);

    ReactDOM.render(faces, container);
  }

  componentDidMount () {
    document.addEventListener('keydown', this.capture);

    client.on('connect', () => {
      this.client = client;
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
        ? <Processing res={this.state.glitchRes} />
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
