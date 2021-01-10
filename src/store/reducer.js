import {ActionType} from "./action";
import {mockBuyers} from "../mock-data";
import {AuthorizationStatus} from "../helpers/const";

const initialState = {
  terminals: [{name: 'Some Name', description: 'any desc', id: '42343'}],
  buyers: mockBuyers,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
  isUserLoading: false,
  isUserLoadError: false,
  isUserLoadSuccess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TERMINAL: 
      return Object.assign({}, state, {
        terminals: state.terminals.concat([action.payload])
      });
    case ActionType.DELETE_TERMINAL: 
      return Object.assign({}, state, {
        terminals: state.terminals.filter((terminal) => terminal.id !== action.payload)
      });
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.GET_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ActionType.SET_IS_LOADING:
      return Object.assign({}, state, {
        isUserLoading: action.payload,
      });    
    case ActionType.SET_IS_LOAD_ERROR:
      return Object.assign({}, state, {
        isUserLoadError: action.payload,
      });
    case ActionType.SET_IS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        isUserLoadSuccess: action.payload,
      });

    default: 
      return state;
  }
};

export {reducer};
