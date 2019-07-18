import axios from 'axios';

export function isLoading(bool:Boolean) {
  return {
    type: 'LOGIN_ATTEMPT',
    isLoading: bool
  };
}

export function loginSuccess(userData:Object) {
  return {
    type: 'LOGIN_SUCCESS',
    userData
  };
}

export function loginFailed(error:Object) {
  return {
    type: 'LOGIN_FAILED',
    error
  };
}

export function login(data:Object) {
  return dispatch => {
    dispatch(isLoading(true));
    return axios.post(
      'https://register.pango.li/api/login',
      {
         email: data.email,
         password: data.password,
      },
      {
         headers: {
           'content-type': 'application/json',
         }
      }
    ).then(response => {
      console.log(response);
      dispatch(loginSuccess(response));
    }).catch(error => {
      console.log(error);
      dispatch(loginFailed(error));
    });
  };
}
