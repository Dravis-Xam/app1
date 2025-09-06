import { createServer } from "http";
import { Server } from "socket.io";
import Client, { Socket as ClientSocket } from "socket.io-client";
import { handleSocketConnection } from "./socket.manager";

describe("Socket Manager", () => {
  let io: Server;
  let serverSocket: any;
  let clientSocket: typeof ClientSocket;
  let httpServer: any;

  beforeAll((done) => {
    httpServer = createServer();
    io = new Server(httpServer, { cors: { origin: "*" } });

    io.on("connection", (socket) => handleSocketConnection(socket, io));

    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket = Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    httpServer.close();
    clientSocket.close();
  });

  test("should create a room", (done) => {
    clientSocket.emit("create-room");

    clientSocket.on("room-created", (roomKey: string) => {
      expect(roomKey).toBeDefined();
      expect(typeof roomKey).toBe("string");
      done();
    });
  });

  test("should join an existing room", (done) => {
    clientSocket.emit("create-room");

    clientSocket.once("room-created", (roomKey: string) => {
      const client2 = Client(`http://localhost:${(httpServer.address() as any).port}`);

      client2.on("connect", () => {
        client2.emit("join-room", roomKey);

        client2.once("room-joined", (joinedRoomKey: string) => {
          expect(joinedRoomKey).toBe(roomKey);
          client2.close();
          done();
        });
      });
    });
  });

  test("should reject joining a non-existent room", (done) => {
    clientSocket.emit("join-room", "fakeRoom123");

    clientSocket.on("error", (msg: string) => {
      expect(msg).toBe("Room does not exist");
      done();
    });
  });

  test("should broadcast chat message", (done) => {
    clientSocket.emit("create-room");

    clientSocket.once("room-created", (roomKey: string) => {
      const client2 = Client(`http://localhost:${(httpServer.address() as any).port}`);

      client2.on("connect", () => {
        client2.emit("join-room", roomKey);

        clientSocket.emit("chat-message", { roomKey, message: "Hello World" });

        client2.once("chat-message", (msg: any) => {
          expect(msg.message).toBe("Hello World");
          expect(msg.id).toBeDefined();
          client2.close();
          done();
        });
      });
    });
  });
});
