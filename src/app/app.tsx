import * as React from "react";
import { User } from "../User";
import UserComponent from "../User/components/User";

export type Props = {
  users: User[];
};

export class App extends React.Component<Props, undefined> {
  render() {
    return (
      <div>
        <h2>Users Seen</h2>
        {this.props.users.map(user => (
          <UserComponent key={user.name} user={user} />
        ))}
      </div>
    );
  }
}