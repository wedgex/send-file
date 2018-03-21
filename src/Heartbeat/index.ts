import { hostname } from "os";

export interface Heartbeat {
  type: "heartbeat";
  hostname: string;
}

export function create(): Heartbeat {
  return {
    type: "heartbeat",
    hostname: hostname()
  };
}

export function encode(): string {
  return JSON.stringify(create());
}

export function decode(msg: string): Heartbeat {
  const json = JSON.parse(msg);
  return json.type === "heartbeat" ? json : null;
}
