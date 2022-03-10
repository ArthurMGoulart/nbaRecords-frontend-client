import { REQUEST_TOKEN,
  GET_TOKEN_SUCESS,
  GET_TOKEN_FAIL,
  SET_PLAYERS, 
  RESET_ERROR} from '../actions';

const initialState = {
  token: '',
  error: '',
  isLoading: false,
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
  case RESET_ERROR:
    return {
      ...state,
      error: '',
      isLoading: false,
    }
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
