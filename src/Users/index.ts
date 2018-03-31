export interface User {
  name: string;
  address: string;
  port: number;
  lastSeen: Date;
}

export type UserFields = {
  name: string;
  address: string;
  port: number;
};

export function create({ name, address, port }: UserFields): User {
  return {
    name,
    address,
    port,
    lastSeen: new Date()
  };
}

export function upsert(users: User[], user: User): User[] {
  // TODO name isn't good enough to use as a identifier
  return sort([user, ...users.filter(u => u.name !== user.name)]);
}

// TODO name isn't really unique but will do for now.
export function find(users: User[], name: string): User | undefined {
  return users.find(user => user.name === name);
}

export function findByAddress(users: User[], address: string): User | undefined {
  return users.find(user => user.address === address);
}

export function sort(users: User[]): User[] {
  return users.sort((a: User, b: User): number => {
    if (isOnline(a) && !isOnline(b)) return -1;
    return a.name.localeCompare(b.name);
  });
}

export function rehydrateDates(users: User[]): User[] {
  return users.map(user => ({ ...user, lastSeen: new Date(user.lastSeen) }));
}

export function isOnline(user: User): boolean {
  const lastSeenSecondsAgo = (new Date().getTime() - user.lastSeen.getTime()) / 1000;
  return lastSeenSecondsAgo < 30;
}
