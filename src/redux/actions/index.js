export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';
export const VALID_LOGIN = 'VALID_LOGIN';
export const SET_PLAYERS = 'SET_PLAYERS';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const getTokenSucess = (token) => ({
  type: GET_TOKEN_SUCESS,
  token,
});

export const getTokenFail = (error) => ({
  type: GET_TOKEN_FAIL,
  error,
});

export const validLogin = (name, password) => ({
  type: VALID_LOGIN,
  name,
  password,
});

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players,
});

export function fetchToken(name, password) {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
        json: true
      };
      const response = await fetch('https://nbarecords-back-end.herokuapp.com/user', requestOptions);
      const data = await response.json();
      const { message } = data;
      if (message) {
        throw new Error(message);
      }
      dispatch(getTokenSucess(data));
    } catch (error) {
      dispatch(getTokenFail(error.message));
    }
  };
}
