// store.js

import { createStore } from "redux";
import scoreReducer from "./reducers";

export default createStore(scoreReducer);
