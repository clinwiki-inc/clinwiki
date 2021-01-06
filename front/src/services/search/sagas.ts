import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import * as api from './api';

function* getSearchPageAggs(action) {
    try {
        let response = yield call(() => api.fetchSearchPageAggs(action.searchParams));
        if(response) {
            yield put(actions.fetchSearchPageAggsSuccess(response));
        }
        else {
            yield put(actions.fetchSearchPageAggsError(response.message));
        }
    }
    catch(err) {
        console.log(err);
        yield put(actions.fetchSearchPageAggsError(err.message));
    }
}

function* getSearchStudies(action) {
    console.log('getSearchStudies')
    try {
        let response = yield call(() => api.fetchSearchStudies(action.hash));
        if(response) {
            console.log(response)
            yield put(actions.fetchSearchStudiesSuccess(response));
        }
        else {
            yield put(actions.fetchSearchStudiesError(response.message));
        }
    }
    catch(err) {
        console.log(err);
        yield put(actions.fetchSearchStudiesError(err.message));
    }
}

export default function* userSagas() {
    yield takeLatest(types.FETCH_SEARCH_PAGE_AGGS_SEND, getSearchPageAggs);
    yield takeLatest(types.FETCH_SEARCH_STUDIES_SEND, getSearchStudies);
}
