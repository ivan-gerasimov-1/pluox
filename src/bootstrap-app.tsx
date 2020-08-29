import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

export function bootstrapApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
