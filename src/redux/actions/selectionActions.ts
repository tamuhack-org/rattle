import { AppActions } from '../../types/actions';
import { Dispatch } from "redux";

export const selectionSuccess = ( event: string, attribute: string ): AppActions => ({
  type: 'SELECTION_SUCCESS',
  event,
  attribute
});

export const updateSelection = (event: string, attribute: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(selectionSuccess(event, attribute));
  };
};
