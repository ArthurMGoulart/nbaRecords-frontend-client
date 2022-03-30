export const SET_NAME = 'SET_NAME';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_PLAYERS_FAIL = 'GET_PLAYERS_FAIL';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';
export const RESET_ERROR = 'RESET_ERROR';
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

export const getPlayersFail = (error) => ({
  type: GET_PLAYERS_FAIL,
  error,
})

export const resetError = (error) => ({
  type: RESET_ERROR,
  error,
})

export const setName = (name) => ({
  type: SET_NAME,
  name,
})

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players,
});

export function fetchPlayers(token) {
  return async (dispatch) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      }
      const response = await fetch('https://nbarecords-back-end.herokuapp.com/user/players', requestOptions);
      const data = await response.json();
      dispatch(setPlayers(data));
    } catch (error) {
      dispatch(getPlayersFail(error.message));
    }
  }
}

export function fetchToken(name, password, path) {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      };
      const response = await fetch(`https://nbarecords-back-end.herokuapp.com/${path}`, requestOptions);
      const data = await response.json();
      const { token, message } = data;
      if (message) {
        throw new Error(message);
      }
      dispatch(getTokenSucess(token));
      dispatch(setName(name));
    } catch (error) {
      dispatch(getTokenFail(error.message));
    }
  };
}
