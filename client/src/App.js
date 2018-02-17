import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';

import Grid from './components/Grid';
import { retrieve } from './modules/images';

import oneGif from './img/1.gif';
import twoGif from './img/2.gif';
import threeGif from './img/3.gif';

const placeholders = [
  oneGif,
  twoGif,
  threeGif
];

export class App extends React.Component {
  componentDidMount () {
    this.props.retrieve();
  }
  render () {
    return <Grid urls={this.props.isRetrieving
      ? placeholders
      : this.props.urls} />;
  }
}

const mapStateToProps = state => ({
  urls: state.images.urls,
  isRetrieving: state.images.isRetrieving
});

const mapDispatchToProps = dispatch => bindActionCreators({
  retrieve
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
