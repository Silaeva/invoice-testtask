import {AuthorizationStatus} from "../const";

const ActionType = {
  ADD_TERMINAL: 'ADD_TERMINAL',
  DELETE_TERMINAL: 'DELETE_TERMINAL',
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
  GET_USER: 'GET_USER',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_IS_LOAD_ERROR: 'SET_IS_LOAD_ERROR',
  SET_IS_LOAD_SUCCESS: 'SET_IS_LOAD_SUCCESS'
};

const addTerminal = (terminal) => ({
  type: ActionType.ADD_TERMINAL,
  payload: terminal
});

const deleteTerminal = (id) => ({
  type: ActionType.DELETE_TERMINAL,
  payload: id
});

const setAuthStatus = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

const getUser = (user) => ({
  type: ActionType.GET_USER,
  payload: user,
});

const setIsloadError = (bool) => ({
  type: ActionType.SET_IS_LOAD_ERROR,
  payload: bool
});

const setIsloading = (bool) => ({
  type: ActionType.SET_IS_LOADING,
  payload: bool
});

const setIsloadSuccess = (bool) => ({
  type: ActionType.SET_IS_LOAD_SUCCESS,
  payload: bool
});

const loadUser = (login) => (dispatch, _getState, api) => (
  api.get('/' + login)
  .then(({data}) => {
    dispatch(getUser(data));
    dispatch(setAuthStatus(AuthorizationStatus.AUTH));
    dispatch(setIsloading(false));
    dispatch(setIsloadError(false));
    dispatch(setIsloadSuccess(true));
  })
  .catch(() => {
    dispatch(setIsloading(false));
    dispatch(setIsloadError(true));
    dispatch(setIsloadSuccess(false));
  })
);

export {ActionType, addTerminal, deleteTerminal, setAuthStatus, loadUser, setIsloading};
