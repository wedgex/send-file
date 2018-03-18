export interface User {
  name: string;
  address: string;
  port: number;
  lastSeen: Date;
}

export function create({
  name,
  address,
  port
}: {
  name: string;
  address: string;
  port: number;
}): User {
  return {
    name,
    address,
    port,
    lastSeen: new Date()
  };
}

export function touch(user: User): User {
  return {
    ...user,
    lastSeen: new Date()
  };
}

// TODO name isn't really unique but will do for now.
export function find(users: User[], name: string): User | undefined {
  return users.find(user => user.name === name);
}
