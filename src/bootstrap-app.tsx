import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';
import './app.css';
import './reset.css';

export function bootstrapApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
