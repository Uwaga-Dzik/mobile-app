import { combineReducers } from "redux";
import MapReducer from "./reducers/MapReducer";

const rootReducer = combineReducers({
  map: MapReducer,
});

export default rootReducer;
