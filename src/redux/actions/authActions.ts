import axios from 'axios';
import { AppActions } from '../../types/actions';
import { Dispatch } from "redux";

export const isLoading = ( loading: boolean ): AppActions => ({
  type: 'LOGIN_ATTEMPT',
  isLoading: loading
});

export const loginSuccess = ( userData: object ): AppActions => ({
  type: 'LOGIN_SUCCESS',
  userData
});

export const loginFailed = ( error: object ): AppActions => ({
  type: 'LOGIN_FAILED',
  error
});

export const logoutComplete = (): AppActions => ({
  type: 'LOGOUT'
});

export const logout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(logoutComplete());
  }
};

export const login = (email: string, password: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    // dispatch(isLoading(true));

    return fetch(
      'https://register.tamuhack.com/api/volunteer/login', {
      method: "POST",
      body: JSON.stringify({
         email: email,
         password: password,
      }),
        headers: {
          'content-type': 'application/json',
        }
      }
    ).then(response => { return response.json() }
    ).then(data => {
      dispatch(loginSuccess(data));
    }).catch(error => {
      dispatch(loginFailed(error));
    });
  };
};
