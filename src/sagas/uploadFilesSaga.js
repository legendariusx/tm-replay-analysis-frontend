import { put, takeLatest, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { uploadFileRequest } from "../lib/API";
import {
    SET_FILE_UPLOADING,
    SET_FILE_UPLOAD_FAILED,
    SET_FILE_UPLOAD_SUCCESS,
    UPLOAD_FILES,
} from "../actions/backend";
import { SET_REPLAY } from "../actions/replay";

function* uploadFiles(action) {
    yield put({ type: SET_FILE_UPLOADING });

    try {
        const results = yield call(uploadFileRequest, action.value);
        let succeeded = 0;
        let partial = 0;
        let failed = 0;

        for (const res of results) {
            if (res.status === "success") {
                yield put({ type: SET_REPLAY, value: res })
                succeeded++;
            } else if(res.status === "partial") {
                yield put({ type: SET_REPLAY, value: res })
                partial++;
            }
            else {
                failed++;
            }
        }
        
        if (failed === 1) toast.error("1 replay failed to extract.");
        else if (failed > 1) toast.error(`${failed} replays failed to extract.`);

        if (partial === 1) toast.warn("1 replay only partially extracted.");
        else if (partial > 1) toast.warn(`${succeeded} replays only partially extracted.`);

        if (succeeded === 1) toast.success("1 replay successfully extracted!");
        else if (succeeded > 1) toast.success(`${succeeded} replays successfully extracted!`);

        yield put({ type: SET_FILE_UPLOAD_SUCCESS });
    } catch (e) {
        yield put({ type: SET_FILE_UPLOAD_FAILED, value: e });
        toast.error("File upload or analysis failed.");
    }
}

function* uploadFilesSaga() {
    yield takeLatest(UPLOAD_FILES, uploadFiles);
}

export default uploadFilesSaga;
