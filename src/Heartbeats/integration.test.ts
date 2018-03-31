import * as Heartbeats from "./index";
import * as HeartbeatsServer from "./server";
import * as HeartbeatsClient from "./client";

describe("Heartbeat/Server", () => {
  it("sends and receives heartbeats", done => {
    const server = HeartbeatsServer.create(8384);
    const client = HeartbeatsClient.create(8385, 8384);

    server.onHeartbeat(heartbeat => {
      expect(heartbeat).toEqual(
        Heartbeats.create({ hostname: "test-name", port: 1234 })
      );
      client.close(() => server.close(done));
    });

    server.bind();
    client.bind();

    client.send(Heartbeats.create({ hostname: "test-name", port: 1234 }));
  });
});
