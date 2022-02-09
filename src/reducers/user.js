// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITAL_STATE = {
  email: '',
};

const user = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return {
      email: action.email,
    };
  default: return state;
  }
};

export default user;
