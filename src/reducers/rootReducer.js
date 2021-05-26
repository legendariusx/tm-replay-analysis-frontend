import { combineReducers } from 'redux';
import replays from './replaysReducer';

const rootReducer = combineReducers({
    replays: replays
});

export default rootReducer;