// sagas/hostingSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHostingInfoSaga() {
  try {
    const response = yield call(axios.get, '/api/hosting');
    yield put({ type: "FETCH_HOSTING_INFO_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_HOSTING_INFO_FAIL", payload: error.message });
  }
}

function* watchFetchHostingInfo() {
  yield takeLatest("FETCH_HOSTING_INFO", fetchHostingInfoSaga);
}

export default watchFetchHostingInfo;
