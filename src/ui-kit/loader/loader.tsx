import classnames from 'classnames';
import * as React from 'react';
import styles from './loader.module.css';

interface ILoader {
  className?: string;
  style?: React.CSSProperties;
}

export function Loader(props: ILoader) {
  return (
    <div
      style={props.style}
      className={classnames(styles.loader, props.className)}
    ></div>
  );
}
