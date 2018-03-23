import * as Client from "./client";
import * as net from "net";
import * as fs from "fs";
import * as FileTransfers from "./index";

describe("FileTransfers/Client", () => {
  let server: net.Server;
  let filename: string;

  beforeEach(() => {
    server = net.createServer();
  });

  afterEach(() => {
    server.close();
  });

  it("sends filename, then stops if declined", done => {
    server.on("connection", socket => {
      const declineFile = (data: Buffer) => {
        filename = data.toString();
        socket.write(FileTransfers.Response.No);
      };

      socket.on("data", declineFile);

      socket.on("close", () => {
        expect(filename).toBe("testFile.txt");
        done();
      });
    });

    server.listen(3333);
    const client = Client.create("localhost", 3333);
    client.sendFile("./tests/mocks/testFile.txt");
  });

  it("sends filename, then file if accepted", done => {
    let fileParts: Buffer[] = [];
    let fileContents = fs.readFileSync("./tests/mocks/testFile.txt");

    server.on("connection", socket => {
      const getFile = (data: Buffer) => {
        fileParts.push(data);
      };

      const acceptFile = (data: Buffer) => {
        filename = data.toString();
        socket.write(FileTransfers.Response.Yes);
        socket.removeListener("data", acceptFile);
        socket.on("data", getFile);
      };

      socket.on("data", acceptFile);

      socket.on("close", () => {
        expect(filename).toBe("testFile.txt");
        expect(Buffer.concat(fileParts)).toEqual(fileContents);
        done();
      });
    });

    server.listen(3333);
    const client = Client.create("localhost", 3333);
    client.sendFile("./tests/mocks/testFile.txt");
  });
});
