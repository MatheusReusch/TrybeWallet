// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITAL_STATE = {
  currencies: [],
  expenses: [],
};

const changeExpense = (expense, objeto) => ({
  id: expense.id,
  value: objeto.value,
  description: objeto.description,
  currency: objeto.currency,
  method: objeto.method,
  tag: objeto.tag,
  exchangeRates: expense.exchangeRates,
});

const wallet = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: action.objeto.id,
        value: action.objeto.value,
        description: action.objeto.description,
        currency: action.objeto.currency,
        method: action.objeto.method,
        tag: action.objeto.tag,
        exchangeRates: action.data,
      }],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((despesa) => despesa.id !== action.id),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((despesa) => (despesa.id === action.id
        ? changeExpense(despesa, action.objeto) : despesa)),
    };
  default: return state;
  }
};

export default wallet;
