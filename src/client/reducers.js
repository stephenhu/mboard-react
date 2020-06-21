// reducers.js

import { CLOCK_START, CLOCK_STOP, CLOCK_STEP, CLOCK_RESET } from "./actions";

export default function scoreReducer(state, action) {

  if(typeof state === "undefined") {
    return null;
  }

  switch(action.type) {
    case CLOCK_START:
      break;
    case CLOCK_STOP:
      break;
    case CLOCK_STEP:
      break;
    case CLOCK_RESET:
      break;
  }

  return state;

}
