import {combineReducers} from 'redux';
import dataReducer from './dataReducer';
import homeReducers from './homeReducers';
import loginReducers from './loginReducers';

const rootReducer = combineReducers({
  data: dataReducer,
  home: homeReducers,
  login: loginReducers,
});

export default rootReducer;
