import * as Server from "./server";
import * as net from "net";
import * as fs from "fs";
import * as FileTransfers from "./index";

describe("FileTransfers/Server", () => {
  let port: number;
  let client: net.Socket;
  let server: Server.Server;

  beforeEach(() => {
    port = 3334;
    client = new net.Socket();
    client.connect(port);
    server = Server.create({ port });
    server.start();
  });

  afterEach(() => {
    server.stop();
  });

  it("gets request then rejects file transfer", done => {
    server.onTransferRequest(({ filename, address }, _, reject) => {
      expect(filename).toBe("test.txt");
      expect(address).toBe(client.localAddress);
      reject();
    });

    client.on("data", data => {
      expect(data.toString()).toBe(FileTransfers.Response.No);
      client.end();
      done();
    });

    client.write("test.txt");
  });

  it("accepts file transfer then gets file", done => {
    const testFile = fs.readFileSync("./tests/mocks/testFile.txt");

    server.onTransferRequest(({ filename, address }, accept) => {
      expect(filename).toBe("testFile.txt");
      expect(address).toBe(client.localAddress);
      accept();
    });

    client.on("data", data => {
      expect(data.toString()).toBe(FileTransfers.Response.Yes);
      client.write(testFile);
      client.end();
    });

    server.onTransfer((filename, data) => {
      expect(filename).toEqual("testFile.txt");
      expect(data).toEqual(testFile);
      done();
    });

    client.write("testFile.txt");
  });
});
