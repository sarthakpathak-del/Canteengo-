import { io, Socket } from "socket.io-client";
import Config from "react-native-config";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (socket) {
    console.log("⚠️ Socket already connected");
    return socket;
  }

  socket = io(Config.SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket?.id);

    socket?.emit("register", userId);
    console.log("📨 Socket register sent:", userId);

  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket manually disconnected");
  }
};
