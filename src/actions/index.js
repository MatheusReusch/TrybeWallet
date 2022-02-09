// Coloque aqui suas actions
export const saveEmail = (email) => ({
  type: 'SAVE_EMAIL',
  email,
});

const saveExpenses = (objeto, data) => ({
  type: 'SAVE_EXPENSE',
  objeto,
  data,
});

export const saveExpense = (objeto) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      dispatch(saveExpenses(objeto, data));
    });
};

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const editExpense = (id, objeto) => ({
  type: 'EDIT_EXPENSE',
  id,
  objeto,
});
