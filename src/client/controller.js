//  controller.js

import React, { createContext } from "react";
import io from "socket.io-client";
import { WS_CONTROLLER } from "./config.js";
import { useDispatch } from "react-redux";

const WebSocketContext= createContext(null);

export { WebSocketContext }

export default ({ children }) => {

  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendCommand = (command, step) => {
    const req = {
      cmd: command,
      step: step
    }

    socket.emit("event://send-message", JSON.stringify(req));
    //dispatch(update)
  }

  if(!socket) {

    socket = io.connect(WS_CONTROLLER)

    socket.on("event://get-message", (msg) => {
      const payload = JSON.parse(msg);
      //dispatch()
    })

    ws = {
      socket: socket,
      sendCommand
    }

  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )

}
