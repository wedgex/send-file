import * as net from "net";
import * as fs from "fs";

export function create() {
  function start() {
    const server = net.createServer();
    server.on("connection", socket => {
      console.log("connected");
      let fileStream: fs.WriteStream;
      socket.on("data", data => {
        console.log("got some data");
        if (fileStream) {
          console.log("write");
          fileStream.write(data);
        } else {
          console.log("got the file name, create stream");
          fileStream = fs.createWriteStream(data.toString());
          socket.write("yes");
        }
      });

      socket.on("error", () => {
        console.log("error");
        fileStream.close();
      });

      socket.on("close", () => {
        console.log("close");
        fileStream.close();
      });
    });
    server.listen(8384);
  }
  return {
    start
  };
}
