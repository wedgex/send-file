import * as User from "./index";

it("User is online if seen within 30 seconds", () => {
  const user: User.User = User.create({
    name: "test",
    address: "localhost",
    port: 1234
  });
  expect(User.isOnline(user)).toBe(true);
});

it("User is offline if seen 30+ seconds ago", () => {
  const user: User.User = User.create({
    name: "test",
    address: "localhost",
    port: 1234
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() - 30);
  user.lastSeen = time;
  expect(User.isOnline(user)).toBe(false);
});
