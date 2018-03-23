import { hostname as osHostname } from "os";

export interface Heartbeat {
  type: "heartbeat";
  hostname: string;
}

export type HeartbeatFields = {
  hostname?: string;
};

export function create(fields: HeartbeatFields): Heartbeat {
  return {
    type: "heartbeat",
    hostname: fields.hostname || osHostname()
  };
}

export function encode(heartbeat: Heartbeat): string {
  return JSON.stringify(heartbeat);
}

export function decode(msg: string): Heartbeat {
  const json = JSON.parse(msg);
  return json.type === "heartbeat" ? json : null;
}
