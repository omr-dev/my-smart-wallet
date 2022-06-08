const INITIAL_STATE = [];
function nextTransactionId(transactions) {
  const maxId = transactions.reduce((maxId, transaction) => {
    return Math.max(transaction.id, maxId);
  }, -1);

  return maxId + 1;
}
export default function transactionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "transactions/transactionAdded": {
      return [
        ...state,

        {
          id: nextTransactionId(state),
          type: action.payload.type,
          title: action.payload.title,
          amount: action.payload.amount,
          day: action.payload.day,
        },
      ];
    }

    case "transactions/transactionEdited": {
      return [
        ...state.map((transaction) => {
          if (transaction.id !== action.payload.id) {
            return transaction;
          } else {
            return {
              ...transaction,
              type: action.payload.type,
              title: action.payload.title,
              amount: action.payload.amount,
              day: action.payload.day,
            };
          }
        }),
      ];
    }
    case "transactions/transactionDeleted": {
      return [
        ...state.filter((transaction) => transaction.id !== action.payload),
      ];
    }
    default:
      return state;
  }
}
