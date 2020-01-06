import { SelectionActionTypes } from '../../types/actions';

const INITIAL_STATE: object = {
  event: "",
  attribute: ""
};

export default function selection(state = INITIAL_STATE, action: SelectionActionTypes): object {
  switch (action.type) {
    case 'SELECTION_SUCCESS':
      return {
        event: action.event,
        attribute: action.attribute
      };
    default:
      return state;
  }
}
