const INITIAL_STATE = { hasRecordToEdit: false };

export default function transactionToEditReducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case "edition/selectToEdit": {
      return { ...state, hasRecordToEdit: true, ...action.payload };
    }
    case "edition/unselect": {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}
