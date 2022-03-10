import { REQUEST_TOKEN,
  GET_TOKEN_SUCESS,
  GET_TOKEN_FAIL,
  VALID_LOGIN,
  SET_PLAYERS } from '../actions';

const initialState = {
  token: '',
  error: '',
  isLoading: false,
  user: {
    name: '',
    password: '',
  },
  players: [],
};

function user(state = initialState, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case GET_TOKEN_SUCESS:
    return {
      ...state,
      token: action.token,
      isLoading: false,
    };
  case GET_TOKEN_FAIL:
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  case VALID_LOGIN:
    return {
      ...state,
      user: { ...state.player, name: action.name, password: action.password },
    };
  case SET_PLAYERS:
    return {
      ...state,
      players: action.players,
    };
  default:
    return state;
  }
}

export default user;
