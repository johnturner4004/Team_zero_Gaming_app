import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchEdit(action) {
  try{
    const id = action.payload;
    const response = yield axios.get(`/api/edit/${id}`);
    yield put({ type: 'SET_EDIT', payload: response.data})
  } catch (error) {
    console.log(`Unable to get edit details: ${error}`);
  }
}

function* deleteItem(action) {
  try {
    const id = action.payload.id;
    const user = action.payload.user_id;
    yield axios.delete(`/api/edit/${id}`);
    yield put({ type:'FETCH_MY_EVENTS', payload: user })
  } catch (error) {
    console.log('Unable to delete', error);
    
  }
}

function* editSaga() {
  yield takeLatest('FETCH_EDIT', fetchEdit);
  yield takeLatest('DELETE', deleteItem);
}

export default editSaga;