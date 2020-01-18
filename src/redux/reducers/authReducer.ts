import { AuthActionTypes } from '../../types/actions';

const INITIAL_STATE: object = {
  isLoggedIn: false,
  isLoading: false,
  userData: undefined,
  error: undefined
};

export default function auth(state = INITIAL_STATE, action: AuthActionTypes): object {
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userData: action.userData,
        error: undefined
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.error
      };
    case 'LOGOUT':
      return {
        userData: undefined,
        isLoading: false,
        isLoggedIn: false,
        error: undefined
      };
    default:
      return state;
  }
}
