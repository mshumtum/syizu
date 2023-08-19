import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleWare from 'redux-saga';

const sagaMiddleWare = createSagaMiddleWare();

import {combinedReducers} from './reducer/combinedReducers';
import rootSaga from './sagas/rootSaga';

const middleWares = [sagaMiddleWare];
const store = createStore(combinedReducers, applyMiddleware(...middleWares));

sagaMiddleWare.run(rootSaga);

export default store;
