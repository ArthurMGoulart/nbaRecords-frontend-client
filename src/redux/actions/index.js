export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';
export const RESET_ERROR = 'RESET_ERROR';
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

export const resetError = (error) => ({
  type: RESET_ERROR,
  error,
})

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  players,
});

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
      console.log(message);
      if (message) {
        throw new Error(message);
      }
      dispatch(getTokenSucess(token));
    } catch (error) {
      dispatch(getTokenFail(error.message));
    }
  };
}
