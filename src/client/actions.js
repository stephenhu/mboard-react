// actions.js

export const CLOCK_START    = "CLOCK_START";
export const CLOCK_STOP     = "CLOCK_STOP";
export const CLOCK_STEP     = "CLOCK_STEP";
export const CLOCK_RESET    = "CLOCK_RESET";


export function clockStartReq() {
  return {
    type: CLOCK_START
  }
}


export function clockStopReq() {
  return {
    type: CLOCK_STOP
  }
}


export function clockResetReq() {
  return {
    type: CLOCK_RESET
  }
}


export function clockStepReq() {
  return {
    type: CLOCK_STEP
  }
}

