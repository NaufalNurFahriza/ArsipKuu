const initialState = {
  loginData: {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    imgProfile: '',
    password: '',
  },
  isLoggedIn: false,
};

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        loginData: action.data,
      };
    case 'ADD_IMAGE':
      return {
        ...state,
        isLoggedIn: true,
        loginData: {
          ...loginData,
          imgProfile: action.data,
        },
      };
    case 'RESET_DATA_LOGIN':
      return {
        ...state,
        loginData: {
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          imgProfile: '',
          password: '',
        },
        isLoggedIn: false,
      };
    case 'LOGIN':
      return {
        ...state,

        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducers;
