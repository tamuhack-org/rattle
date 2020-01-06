export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT";
export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export interface LoginAction {
  type: typeof LOGIN;
  email: string;
  password: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface LoginAttemptAction {
  type: typeof LOGIN_ATTEMPT;
  isLoading: boolean;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  userData: object;
}

export interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  error: object;
}

export type AuthActionTypes = LoginAction | LogoutAction | LoginAttemptAction | LoginSuccessAction | LoginFailedAction;

export const SELECTION_SUCCESS = "SELECTION_SUCCESS";

export interface SelectionSuccessAction {
  type: typeof SELECTION_SUCCESS;
  event: string;
  attribute: string;
}

export type SelectionActionTypes = SelectionSuccessAction;

export type AppActions = AuthActionTypes | SelectionActionTypes;
