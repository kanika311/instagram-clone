// src/context/SocketContext.js
import { messageList } from "@/redux/slices/message";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ userId, children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

socket.current = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

      socket.current.emit("new user", { userId });

      // Fetch chat list on mount
      dispatch(messageList());

      socket.current.on("online users", (users) => {
        setOnlineUsers(users);
      });

      socket.current.on("chat message", (data) => {
        console.log("Incoming message: ", data);
        // Update chat list when a new message is received
        dispatch(messageList());
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [userId, dispatch]);

  const sendMessage = (data) => {
    socket.current.emit("chat message", data);
    // Optionally update chat list after sending
    dispatch(messageList());
    console.log("Message sent: ", data);
  };

  return (
    <SocketContext.Provider value={{ socket: socket.current, onlineUsers, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};