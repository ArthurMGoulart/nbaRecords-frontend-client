import { VALID_LOGIN } from '../actions';

const initialState = {
  name: '',
  password: '',
};

function login(state = initialState, action) {
  switch (action.type) {
  case VALID_LOGIN:
    return {
      ...state,
      name: action.name,
      password: action.password,
    };
  default:
    return state;
  }
}

export default login;
