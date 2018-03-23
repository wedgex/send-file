import * as Heartbeat from "./index";
import * as HeartbeatServer from "./server";
import * as HeartbeatClient from "./client";

describe("Heartbeat server", () => {
  it("sends and receives heartbeats", done => {
    const server = HeartbeatServer.create(8384);
    const client = HeartbeatClient.create(8385, 8384);

    server.onHeartbeat(heartbeat => {
      expect(heartbeat).toEqual(Heartbeat.create({ hostname: "test-name" }));
      client.close(() => server.close(done));
    });

    server.bind();
    client.bind();

    client.send(Heartbeat.create({ hostname: "test-name" }));
  });
});
