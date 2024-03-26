const initialState = {
  storeData: [],
};

const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        storeData: action.data,
      };
    case 'RESET_DATA':
      return {
        ...state,
        storeData: [],
      };
    default:
      return state;
  }
};

export default homeReducers;
