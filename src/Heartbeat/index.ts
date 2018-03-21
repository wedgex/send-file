import { hostname } from "os";

export interface Heartbeat {
  type: "heartbeat";
  hostname: string;
}

export function createHeartbeat(): Heartbeat {
  return {
    type: "heartbeat",
    hostname: hostname()
  };
}

export function encodeHeartbeat(): string {
  return JSON.stringify(createHeartbeat());
}

export function decodeHeartbeat(msg: string): Heartbeat {
  const json = JSON.parse(msg);
  return json.type === "heartbeat" ? json : null;
}
