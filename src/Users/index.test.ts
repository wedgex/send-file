import * as Users from "./index";

it("User is online if seen within 30 seconds", () => {
  const user: Users.User = Users.create({
    name: "test",
    address: "localhost",
    port: 1234
  });
  expect(Users.isOnline(user)).toBe(true);
});

it("User is offline if seen 30+ seconds ago", () => {
  const user: Users.User = Users.create({
    name: "test",
    address: "localhost",
    port: 1234
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() - 30);
  user.lastSeen = time;
  expect(Users.isOnline(user)).toBe(false);
});
