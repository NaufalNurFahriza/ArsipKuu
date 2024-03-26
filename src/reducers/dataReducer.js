const initialState = {
  product: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_DATA':
      var newData = [...state.product];
      var findIndex = state.product.findIndex(value => {
        return value.id === action.id;
      });
      newData.splice(findIndex, 1);
      return {
        ...state,
        product: newData,
      };
    case 'UPDATE_DATA':
      var newData = [...state.product];
      var findIndex = state.product.findIndex(value => {
        return value.id === action.data.id;
      });
      newData[findIndex] = action.data;
      return {
        ...state,
        product: newData,
      };

    case 'ADD_DATA':
      return {
        ...state,
        product: action.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
