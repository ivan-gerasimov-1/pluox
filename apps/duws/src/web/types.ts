import type { Root } from 'react-dom/client';

export interface IRoot extends Root {}

export interface IWindow extends Window {}
export interface IDocument extends Document {}
export interface IHTMLElement extends HTMLElement {}

export interface IUserInterface {
	start(): Promise<void>;
	dispose(): IUserInterface;
}

export type TValueOf<T> = T[keyof T];
