import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';

import Grid from './components/Grid';
import { retrieve } from './modules/images';

export class App extends React.Component {
  componentDidMount () {
    this.props.retrieve();
  }
  render () {
    return this.props.isRetrieving
      ? <div>Loading</div>
      : <Grid urls={this.props.urls} />;
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
