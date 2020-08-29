import { createApi, createStore } from 'effector';

export interface IGlobalStateStore {
  isAdd: boolean;
}

export let $globalState = createStore<IGlobalStateStore>(
  {
    isAdd: false,
  },
  {
    name: '$globalState',
  },
);

export let $globalStateApi = createApi($globalState, {
  setAdd(prevState, payload: boolean) {
    return {
      ...prevState,
      isAdd: payload,
    };
  },
});
