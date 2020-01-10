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
//
// export const logoutComplete = (): AppActions => ({
//   type: 'LOGOUT_COMPLETE'
// });

export function logout() {
  return dispatch => {
    //dispatch(logoutComplete());
    //Actions.replace('login');
  };
};

export const login = (email: string, password: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    // dispatch(isLoading(true));

    return axios.post(
      'https://register.tamuhack.com/api/volunteer/login',
      {
         email: email,
         password: password,
      },
      {
         headers: {
           'content-type': 'application/json',
         }
      }
    ).then(response => {
      console.log('Login', response)
      dispatch(loginSuccess(response));
    }).catch(error => {
      dispatch(loginFailed(error));
    });
  };
};
