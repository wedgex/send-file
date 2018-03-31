import * as Client from "./client";
import * as Server from "./server";
import * as fs from "fs";

describe("FileTransfer Integration", () => {
  const port = 3335;
  const testFilePath = "./tests/mocks/testFile.txt";
  let testFile: Buffer;
  let server: Server.Server;

  beforeEach(() => {
    testFile = fs.readFileSync(testFilePath);
    server = Server.create({ port });
  });

  afterEach(done => {
    server.stop(done);
  });

  it("sends and receives file", done => {
    server.onTransferRequest((_, accept) => accept());
    const client = Client.create("localhost", port);
    server.onTransfer((filename: string, file: Buffer) => {
      expect(filename).toEqual("testFile.txt");
      expect(file).toEqual(testFile);
      done();
    });
    server.start();
    client.sendFile(testFilePath);
  });

  it("can receive multiple files", done => {
    server.onTransferRequest((_, accept) => accept());
    server.start();
    let client = Client.create("localhost", port);
    client.sendFile(testFilePath);
    client = Client.create("localhost", port);
    server.onTransfer((filename: string, file: Buffer) => {
      expect(filename).toEqual("testFile.txt");
      expect(file).toEqual(testFile);
      done();
    });
    client.sendFile(testFilePath);
  });
});
