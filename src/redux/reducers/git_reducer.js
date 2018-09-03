/**
 * Created by kenji on 3/9/18.
 */

//Load repos
export const GET_REPOS = 'ReduxStarter/repos/LOAD';
export const GET_REPOS_SUCCESS = 'ReduxStarter/repos/LOAD_SUCCESS';
export const GET_REPOS_FAIL = 'ReduxStarter/repos/LOAD_FAIL';

//Load repo data
export const GET_REPO_INFO = 'ReduxStarter/repos/INFO';
export const GET_REPO_INFO_SUCCESS = 'ReduxStarter/repos/INFO_SUCCESS';
export const GET_REPO_INFO_FAIL = 'ReduxStarter/repos/INFO_FAIL';

export const GET_USER = 'ReduxStarter/repos/USER';
export const GET_USER_SUCCESS = 'ReduxStarter/repos/USER_SUCCESS';
export const GET_USER_FAIL = 'ReduxStarter/repos/USER_FAIL';

//The initial state passed into the reducer
const initialState = { repos: [], repoInfo: {}, user: {} };


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_REPOS:
            return {...state, loading: true };
        case GET_REPOS_SUCCESS:
            return { ...state, loading: false, repos: action.payload.data };
        case GET_REPOS_FAIL:
            return { ...state, loading: false, error: 'Failed to retrieve repo list' };
        case GET_REPO_INFO:
            return { ...state, loadingInfo: true };
        case GET_REPO_INFO_SUCCESS:
            return { ...state, loadingInfo: false, repoInfo: action.payload.data };
        case GET_REPO_INFO_FAIL:
            console.log(action.payload);
            return { ...state, loadingInfo: false, errorInfo: 'Error getting individual repo information'};
        case GET_USER:
            return { ...state, loadingProfile: true };
        case GET_USER_SUCCESS:
            return { ...state, loadingProfile: false, user: action.payload.data };
        case GET_USER_FAIL:
            return { ...state, loadingProfile: false, errorUser: 'Error getting individual profile information'};
        default:
            return state;
    }
}

export function listRepos(user) {
    return {
        type: GET_REPOS,
        payload: {
            request: {
                url: `/users/${user}/repos`
            }
        }
    };
}

export function getRepoDetail(user, repo) {
    return {
        type: GET_REPO_INFO,
        payload: {
            request: {
                url: `/repos/${user}/${repo}`
            }
        }
    }
}

export function getUser(user) {
    return {
        type: GET_USER,
        payload: {
            request: {
                url: `/users/${user}`
            }
        }
    }
}
