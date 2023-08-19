import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_LANGUAGE_REQUEST,
  GET_LANGUAGE_FAILURE,
  GET_LANGUAGE_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';

function* getLanguage(action) {
  try {
    console.log('check1', action);
    const response = yield axios.get(`${baseUrl}getAllLanguages`);
    // const response = yield getLanguage();
    console.log('Response', response);
    yield put({type: GET_LANGUAGE_SUCCESS, response});
  } catch (error) {
    console.log('Response', error);
    yield put({type: GET_LANGUAGE_FAILURE, error: error.message});
  }
}

export default function* getLanguageSaga() {
  yield takeEvery(GET_LANGUAGE_REQUEST, getLanguage);
}
