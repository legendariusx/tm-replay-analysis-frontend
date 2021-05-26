import { all } from 'redux-saga/effects'
import uploadFilesSaga from './uploadFilesSaga'

export default function* rootSaga() {
    yield all([
        uploadFilesSaga()
    ])
}