import { Server } from "socket.io";

let io: Server | null = null;


// Initialize Socket.IO

export const initSocket = (server: Server) => {

  io = server;


  io.on("connection", (socket) => {

    console.log(
      "🟢 Socket Connected:",
      socket.id
    );


    // Join fleet room (optional)

    socket.join("fleet");


    socket.on(
      "vehicleUpdate",
      (data) => {

        console.log(
          "🚚 Vehicle Update:",
          data
        );


        io?.to("fleet").emit(
          "vehicleUpdate",
          data
        );

      }
    );



    socket.on(
      "disconnect",
      () => {

        console.log(
          "🔴 Socket Disconnected:",
          socket.id
        );

      }
    );


  });


};



// Get Socket Instance

export const getIO = (): Server => {

  if (!io) {

    throw new Error(
      "Socket.IO not initialized"
    );

  }


  return io;

};